import { useState } from 'react';
import type { Message } from '../types';
import { ChevronRight, ChevronDown, GitMerge, MessageCircle, Hash, MessageSquare, Reply } from 'lucide-react';
import './MessageNode.css';
import './MessageNodeCitation.css';

interface MessageNodeProps {
    msg: Message;
    isNested?: boolean;
    onReply?: (msg: Message) => void;
    onThread?: (messageId: string) => void;
}

export function MessageNode({ msg, isNested = false, onReply, onThread }: MessageNodeProps) {
    const [isBranchOpen, setIsBranchOpen] = useState(false);

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
                            {msg.threadCount && (
                                <div className="thread-count-affordance" onClick={() => onThread?.(msg.id)}>
                                    {msg.threadCount} threads
                                </div>
                            )}
                            <div className="message-actions">
                                <button
                                    className="action-btn"
                                    title="Reply in thread"
                                    onClick={() => onThread?.(msg.id)}
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
