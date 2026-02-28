import { useState, useRef, useEffect } from 'react';
import type { Subject, Message } from '../types';
import { MessageNode } from './MessageNode';
import { mockSubjects } from '../data/mockData';
import { Hash, ArrowRight, Folder } from 'lucide-react';
import './StreamView.css';
import './StreamViewMention.css';

interface StreamViewProps {
    subject: Subject;
    messages: Message[];
    onThread?: (messageId: string) => void;
}

interface ReplyContext {
    subjectId: string;
    message?: Message;
}

export function StreamView({ subject, messages, onThread }: StreamViewProps) {
    const [inputValue, setInputValue] = useState('');
    const [showMentions, setShowMentions] = useState(false);
    const [mentionFilter, setMentionFilter] = useState('');

    const [replyContext, setReplyContext] = useState<ReplyContext | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [subject.id, messages]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (showMentions) setShowMentions(false);
                else if (replyContext) setReplyContext(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showMentions, replyContext]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        const lastAtMatch = val.match(/@([a-zA-Z0-9\s]*)$/);
        if (lastAtMatch) {
            setShowMentions(true);
            setMentionFilter(lastAtMatch[1].toLowerCase());
        } else {
            setShowMentions(false);
        }
    };

    const handleSelectMention = (mentionSubject: Subject) => {
        const newVal = inputValue.replace(/@([a-zA-Z0-9\s]*)$/, `@[${mentionSubject.title}] `);
        setInputValue(newVal);
        setShowMentions(false);
        inputRef.current?.focus();
    };

    const handleReply = (context: ReplyContext) => {
        setReplyContext(context);
        inputRef.current?.focus();
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Group messages by subjectId
    const messageGroups: { subjectId: string; messages: Message[] }[] = [];
    messages.forEach(msg => {
        const lastGroup = messageGroups[messageGroups.length - 1];
        if (lastGroup && lastGroup.subjectId === msg.subjectId) {
            lastGroup.messages.push(msg);
        } else {
            messageGroups.push({ subjectId: msg.subjectId, messages: [msg] });
        }
    });

    const filteredSubjects = mockSubjects.filter(s =>
        s.id !== subject.id && s.title.toLowerCase().includes(mentionFilter)
    );

    const activeReplySubject = replyContext ? mockSubjects.find(s => s.id === replyContext.subjectId) : null;

    return (
        <div className="stream-view">
            <header className="stream-header">
                <div className="stream-category">
                    {subject.category === 'Folder' ? 'Collection' : subject.category}
                </div>
                <h2>
                    {subject.category === 'Folder' ? `All ${subject.title} Streams` : subject.title}
                </h2>
            </header>

            <div className="stream-content">
                <div className="stream-messages" ref={scrollRef}>
                    {messageGroups.map((group, groupIdx) => {
                        const groupSubject = mockSubjects.find(s => s.id === group.subjectId);
                        return (
                            <div key={`${group.subjectId}-${groupIdx}`} className="conversation-group">
                                {subject.category === 'Folder' && groupSubject && (
                                    <div className="conversation-section-header">
                                        {groupSubject.title} • {formatDate(groupSubject.lastUpdated)}
                                    </div>
                                )}
                                <div className="messages-wrapper">
                                    {group.messages.map(msg => (
                                        <MessageNode
                                            key={msg.id}
                                            msg={msg}
                                            onReply={(message) => handleReply({ subjectId: group.subjectId, message })}
                                            onThread={(messageId) => onThread?.(messageId)}
                                        />
                                    ))}
                                    {subject.category === 'Folder' && (
                                        <button
                                            className="continue-btn"
                                            onClick={() => handleReply({ subjectId: group.subjectId })}
                                        >
                                            <span>Continue</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="stream-input-container">
                    <div className="stream-input-positioner">
                        {showMentions && (
                            <div className="mention-overlay card">
                                <div className="mention-header">Reference a Stream</div>
                                <div className="mention-list">
                                    {filteredSubjects.length > 0 ? (
                                        filteredSubjects.map(s => (
                                            <button
                                                key={s.id}
                                                className="mention-item"
                                                onClick={() => handleSelectMention(s)}
                                            >
                                                {s.category === 'Folder' ? (
                                                    <Folder size={14} className="text-accent" />
                                                ) : (
                                                    <Hash size={14} className="text-accent" />
                                                )}
                                                <span>{s.title}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="mention-empty">No matching streams</div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="stream-input-wrapper">
                            {replyContext && activeReplySubject && (
                                <div className="reply-preview">
                                    <div className="reply-preview-content">
                                        <div className="reply-preview-details">
                                            <div className="reply-preview-subject">
                                                <Hash size={12} className="text-accent" />
                                                <span>{replyContext.message ? `Reply to ${activeReplySubject.title}` : `Continuing: ${activeReplySubject.title}`}</span>
                                            </div>
                                            {replyContext.message && (
                                                <div className="reply-quoted-text">
                                                    {replyContext.message.content}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="close-reply-btn"
                                            onClick={() => setReplyContext(null)}
                                        >
                                            <span style={{ fontSize: '18px' }}>×</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={replyContext ? "Enter message..." : "Message or type @ to reference..."}
                                className="stream-input"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
