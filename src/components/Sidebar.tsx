import { useState } from 'react';
import { BookOpen, Hash, Home, Pin, Settings, Folder, CornerDownRight } from 'lucide-react';
import type { Subject, Message } from '../types';
import { ThemeToggle } from './ThemeToggle';
import './Sidebar.css';
import './SidebarTabs.css';

interface SidebarProps {
    subjects: Subject[];
    activeSubjectId: string | null;
    onSelectSubject: (id: string | null) => void;
    allMessages: Message[];
    onSelectThread: (messageId: string, threadId: string) => void;
}

type TabType = 'recent' | 'subject' | 'top';

export function Sidebar({ subjects, activeSubjectId, onSelectSubject, allMessages, onSelectThread }: SidebarProps) {
    const [activeTab, setActiveTab] = useState<TabType>('recent');

    const pinnedSubjects = subjects.filter(s => s.isPinned);
    const unpinnedSubjects = subjects.filter(s => !s.isPinned);

    let displayedSubjects = unpinnedSubjects.filter(s => s.category !== 'Folder');
    if (activeTab === 'recent') {
        displayedSubjects.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    } else if (activeTab === 'subject') {
        displayedSubjects = [...unpinnedSubjects];
        displayedSubjects.sort((a, b) => a.title.localeCompare(b.title));
    } else if (activeTab === 'top') {
        displayedSubjects.sort((a, b) => b.views - a.views);
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <BookOpen size={24} className="logo-icon" />
                    <span>Knowledge Base</span>
                </div>
            </div>

            <div className="sidebar-scroll">
                <nav className="sidebar-section">
                    <button
                        className={`nav-item ${activeSubjectId === null ? 'active' : ''}`}
                        onClick={() => onSelectSubject(null)}
                    >
                        <Home size={18} />
                        <span>Home</span>
                    </button>
                </nav>

                <nav className="sidebar-section">
                    <h3 className="section-title">Pinned</h3>
                    {pinnedSubjects.map(subject => (
                        <button
                            key={subject.id}
                            className={`nav-item nav-subject ${activeSubjectId === subject.id ? 'active' : ''}`}
                            onClick={() => onSelectSubject(subject.id)}
                        >
                            <Pin size={16} className="item-icon pinned-icon" />
                            <span className="truncate">{subject.title}</span>
                        </button>
                    ))}
                </nav>

                <nav className="sidebar-section">
                    <div className="sidebar-tabs">
                        <button
                            className={`sidebar-tab ${activeTab === 'recent' ? 'active' : ''}`}
                            onClick={() => setActiveTab('recent')}
                        >Recent</button>
                        <button
                            className={`sidebar-tab ${activeTab === 'subject' ? 'active' : ''}`}
                            onClick={() => setActiveTab('subject')}
                        >Subject</button>
                        <button
                            className={`sidebar-tab ${activeTab === 'top' ? 'active' : ''}`}
                            onClick={() => setActiveTab('top')}
                        >Top</button>
                    </div>

                    <div className="subject-list-container">
                        {activeTab === 'subject' ? (
                            <SubjectTree
                                subjects={subjects}
                                activeSubjectId={activeSubjectId}
                                onSelectSubject={onSelectSubject}
                                allMessages={allMessages}
                                onSelectThread={onSelectThread}
                            />
                        ) : (
                            displayedSubjects.map(subject => (
                                <button
                                    key={subject.id}
                                    className={`nav-item nav-subject ${activeSubjectId === subject.id ? 'active' : ''}`}
                                    onClick={() => onSelectSubject(subject.id)}
                                >
                                    {subject.category === 'Folder' ? (
                                        <Folder size={16} className="item-icon" />
                                    ) : (
                                        <Hash size={16} className="item-icon" />
                                    )}
                                    <span className="truncate">{subject.title}</span>
                                </button>
                            ))
                        )}
                    </div>
                </nav>
            </div>

            <div className="sidebar-footer">
                <button className="nav-item">
                    <Settings size={18} />
                    <span>Settings</span>
                </button>
                <ThemeToggle />
            </div>
        </aside>
    );
}

// --- Recursive Tree Components ---

interface SubjectTreeProps {
    subjects: Subject[];
    activeSubjectId: string | null;
    onSelectSubject: (id: string | null) => void;
    allMessages: Message[];
    onSelectThread: (messageId: string, threadId: string) => void;
    parentId?: string;
    level?: number;
}

function SubjectTree({ subjects, activeSubjectId, onSelectSubject, allMessages, onSelectThread, parentId, level = 0 }: SubjectTreeProps) {
    // Find children of the current parent (if parentId is undefined, find root nodes)
    const children = subjects.filter(s =>
        parentId ? s.parentId === parentId : !s.parentId
    ).sort((a, b) => a.title.localeCompare(b.title));

    if (children.length === 0) return null;

    return (
        <div className="tree-node-list">
            {children.map(node => (
                <TreeNode
                    key={node.id}
                    node={node}
                    allSubjects={subjects}
                    activeSubjectId={activeSubjectId}
                    onSelectSubject={onSelectSubject}
                    allMessages={allMessages}
                    onSelectThread={onSelectThread}
                    level={level}
                />
            ))}
        </div>
    );
}

interface TreeNodeProps {
    node: Subject;
    allSubjects: Subject[];
    activeSubjectId: string | null;
    onSelectSubject: (id: string | null) => void;
    allMessages: Message[];
    onSelectThread: (messageId: string, threadId: string) => void;
    level: number;
}

function TreeNode({ node, allSubjects, activeSubjectId, onSelectSubject, allMessages, onSelectThread, level }: TreeNodeProps) {
    const [isOpen, setIsOpen] = useState(true);

    const hasChildren = allSubjects.some(s => s.parentId === node.id);
    const hasThreads = allMessages.some(m => m.subjectId === node.id && m.threads && m.threads.length > 0);
    const isExpandable = hasChildren || hasThreads;
    const isFolder = node.category === 'Folder';

    const paddingLeft = `${(level * 12) + 12}px`;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="tree-node">
            <button
                className={`nav-item nav-subject tree-item ${activeSubjectId === node.id ? 'active' : ''}`}
                onClick={() => onSelectSubject(node.id)}
                style={{ paddingLeft }}
            >
                {isExpandable ? (
                    <div className="tree-toggle" onClick={handleToggle}>
                        {isOpen ? <span style={{ fontSize: '10px' }}>▼</span> : <span style={{ fontSize: '10px' }}>▶</span>}
                    </div>
                ) : (
                    <div className="tree-toggle-spacer" style={{ width: '14px', marginRight: '4px' }} />
                )}

                {isFolder ? (
                    <Folder size={14} className="item-icon" style={{ marginRight: '8px' }} />
                ) : (
                    <Hash size={14} className="item-icon" style={{ marginRight: '8px' }} />
                )}

                <span className="truncate">{node.title}</span>
            </button>

            {hasChildren && isOpen && (
                <SubjectTree
                    subjects={allSubjects}
                    activeSubjectId={activeSubjectId}
                    onSelectSubject={onSelectSubject}
                    allMessages={allMessages}
                    onSelectThread={onSelectThread}
                    parentId={node.id}
                    level={level + 1}
                />
            )}

            {isOpen && allMessages
                .filter(m => m.subjectId === node.id && m.threads && m.threads.length > 0)
                .flatMap(m => m.threads?.map(t => ({ ...t, messageId: m.id })) || [])
                .map(thread => (
                    <button
                        key={thread.id}
                        className="nav-item nav-thread tree-item"
                        onClick={() => onSelectThread(thread.messageId, thread.id)}
                        style={{ paddingLeft: `${(level + 1.8) * 12 + 12}px` }}
                    >
                        <CornerDownRight size={14} className="item-icon curved-arrow-icon" style={{ marginRight: '4px' }} />
                        <span className="truncate thread-summary-text">{thread.summary || 'Thread'}</span>
                    </button>
                ))}
        </div>
    );
}
