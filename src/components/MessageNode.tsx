import { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { ChevronRight, ChevronDown, GitMerge, MessageCircle, Hash, MessageSquare, Reply, CornerDownRight } from 'lucide-react';
import './MessageNode.css';
import './MessageNodeCitation.css';

interface MessageNodeProps {
    msg: Message;
    isNested?: boolean;
    onReply?: (msg: Message) => void;
    onThread?: (messageId: string, mode: 'create' | 'view', threadId?: string) => void;
}

export function MessageNode({ msg, isNested = false, onReply, onThread }: MessageNodeProps) {
    const [isBranchOpen, setIsBranchOpen] = useState(false);
    const [showThreadDropdown, setShowThreadDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showThreadDropdown) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowThreadDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showThreadDropdown]);

    const handleThreadIndicatorClick = () => {
        if (!msg.threads || msg.threads.length === 0) return;
        if (msg.threads.length === 1) {
            onThread?.(msg.id, 'view', msg.threads[0].id);
        } else {
            setShowThreadDropdown(!showThreadDropdown);
        }
    };

    const handleSelectThread = (threadId: string) => {
        onThread?.(msg.id, 'view', threadId);
        setShowThreadDropdown(false);
    };

    const formatThreadTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getThreadDisplay = (thread: any) => {
        if (thread.summary) return thread.summary;
        const lastMsg = thread.messages[thread.messages.length - 1];
        if (!lastMsg) return 'No messages';
        return lastMsg.content.length > 40 ? lastMsg.content.substring(0, 40) + '...' : lastMsg.content;
    };

    return (
        <div className={`message-wrapper ${isNested ? 'nested' : ''}`}>
            {!isNested && msg.isSoftBoundaryStarted && (
                <div className="soft-boundary">
                    <div className="boundary-line"></div>
                    <span className="boundary-label">{msg.boundaryLabel || 'New Stream'}</span>
                    <div className="boundary-line"></div>
                </div>
            )}

            <div className={`message-bubble-container ${msg.role}`}>
                <div className="message-bubble">
                    {msg.content}
                    {msg.role === 'ai' && (
                        <div className="message-actions-wrapper">
                            <div className="message-actions">
                                <button
                                    className="action-btn"
                                    title="Reply in thread"
                                    onClick={() => onThread?.(msg.id, 'create')}
                                >
                                    <MessageSquare size={16} />
                                </button>
                                <button
                                    className="action-btn"
                                    title="Quote reply"
                                    onClick={() => onReply?.(msg)}
                                >
                                    <Reply size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {msg.role === 'ai' && msg.threads && msg.threads.length > 0 && (
                <div className="thread-count-affordance-row">
                    <div className="thread-count-affordance-container" ref={dropdownRef}>
                        <div className="thread-count-affordance" onClick={handleThreadIndicatorClick}>
                            {msg.threads.length} {msg.threads.length === 1 ? 'thread' : 'threads'}
                        </div>
                        {showThreadDropdown && (
                            <div className="thread-dropdown card">
                                {msg.threads.map((thread) => (
                                    <div
                                        key={thread.id}
                                        className="thread-dropdown-item"
                                        onClick={() => handleSelectThread(thread.id)}
                                    >
                                        <div className="thread-item-content">
                                            <CornerDownRight size={14} className="thread-curved-arrow" />
                                            <div className="thread-item-details">
                                                <div className="thread-item-header">
                                                    <span className="thread-summary-text">{getThreadDisplay(thread)}</span>
                                                    <span className="thread-timestamp">
                                                        {formatThreadTime(thread.lastUpdated)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {msg.references && msg.references.length > 0 && (
                <div className={`references-container ${msg.role}`}>
                    {msg.references.map(ref => (
                        <div key={ref.id} className="citation-card card">
                            <div className="citation-header">
                                <Hash size={14} className="text-accent" />
                                <span className="citation-subject">Reference</span>
                            </div>
                            <p className="citation-snippet">"{ref.snippet}"</p>
                        </div>
                    ))}
                </div>
            )}

            {msg.branch && (
                <div className="branch-container">
                    {msg.branch.type === 'aside' && (
                        <div className="branch-aside">
                            <button
                                className="btn btn-ghost btn-sm branch-toggle"
                                onClick={() => setIsBranchOpen(!isBranchOpen)}
                            >
                                {isBranchOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                Quick Aside ({msg.branch.messages.length} messages)
                            </button>

                            {isBranchOpen && (
                                <div className="branch-content indented">
                                    {msg.branch.messages.map(bMsg => (
                                        <MessageNode key={bMsg.id} msg={bMsg} isNested={true} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {msg.branch.type === 'exploratory' && (
                        <div className={`branch-exploratory ${msg.branch.isMerged ? 'merged' : ''}`}>
                            {msg.branch.isMerged ? (
                                <div className="merge-summary card">
                                    <div className="merge-header">
                                        <GitMerge size={16} className="text-accent" />
                                        <strong>Branch Merged</strong>
                                    </div>
                                    <p className="merge-text">{msg.branch.mergeSummary}</p>
                                    <button
                                        className="btn btn-ghost btn-sm mt-2"
                                        onClick={() => setIsBranchOpen(!isBranchOpen)}
                                    >
                                        {isBranchOpen ? 'Hide transcript' : 'View full transcript'}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-ghost btn-sm branch-toggle"
                                    onClick={() => setIsBranchOpen(!isBranchOpen)}
                                >
                                    <MessageCircle size={14} />
                                    Exploratory Branch
                                </button>
                            )}

                            {isBranchOpen && (
                                <div className="branch-content indented card">
                                    {msg.branch.messages.map(bMsg => (
                                        <MessageNode key={bMsg.id} msg={bMsg} isNested={true} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
