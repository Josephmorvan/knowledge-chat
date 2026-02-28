import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { StreamView } from './components/StreamView';
import { MessageNode } from './components/MessageNode';
import { mockSubjects, mockMessages } from './data/mockData';
import type { Message } from './types';
import './App.css';

function App() {
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeSubThreadId, setActiveSubThreadId] = useState<string | null>(null);
  const [threadMode, setThreadMode] = useState<'create' | 'view'>('view');

  const activeSubject = activeSubjectId ? mockSubjects.find(s => s.id === activeSubjectId) : null;

  // Helper to find all descendant IDs recursively
  const getDescendantIds = (parentId: string): string[] => {
    let ids = [parentId];
    const children = mockSubjects.filter(s => s.parentId === parentId);
    for (const child of children) {
      ids = [...ids, ...getDescendantIds(child.id)];
    }
    return ids;
  };

  const currentMessages = activeSubjectId
    ? (() => {
      if (activeSubject?.category === 'Folder') {
        const descendantIds = getDescendantIds(activeSubjectId);
        const relevantSubjects = mockSubjects
          .filter(s => descendantIds.includes(s.id) && s.category !== 'Folder')
          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

        let allMsgs: Message[] = [];
        relevantSubjects.forEach(s => {
          const subjectMsgs = mockMessages
            .filter(m => m.subjectId === s.id)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          allMsgs = [...allMsgs, ...subjectMsgs];
        });
        return allMsgs;
      }
      return mockMessages
        .filter(m => m.subjectId === activeSubjectId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    })()
    : [];

  const activeThreadMessage = activeThreadId ? mockMessages.find(m => m.id === activeThreadId) : null;

  const handleSelectThreadFromSidebar = (messageId: string, threadId: string) => {
    setActiveSubjectId(mockMessages.find(m => m.id === messageId)?.subjectId || null);
    setActiveThreadId(messageId);
    setActiveSubThreadId(threadId);
    setThreadMode('view');
  };

  return (
    <div className="app-layout">
      <Sidebar
        subjects={mockSubjects}
        activeSubjectId={activeSubjectId}
        onSelectSubject={setActiveSubjectId}
        allMessages={mockMessages}
        onSelectThread={handleSelectThreadFromSidebar}
      />
      <main className={`main-content ${activeThreadId ? 'has-thread' : ''}`}>
        <div className="stream-container">
          {activeSubjectId === null ? (
            <HomeView subjects={mockSubjects} onSelectSubject={setActiveSubjectId} />
          ) : activeSubject ? (
            <StreamView
              subject={activeSubject}
              messages={currentMessages}
              onThread={(id, mode, threadId) => {
                setActiveThreadId(id);
                setThreadMode(mode);
                setActiveSubThreadId(threadId || null);
              }}
            />
          ) : (
            <div className="not-found">Subject not found</div>
          )}
        </div>
        {activeThreadId && activeThreadMessage && (
          <aside className="thread-aside">
            <div className="thread-header">
              <h3>Thread</h3>
              <button
                className="close-thread-btn"
                onClick={() => setActiveThreadId(null)}
              >
                ×
              </button>
            </div>
            <div className="thread-content-placeholder">
              <div className="thread-replies-list">
                {threadMode === 'view' && (() => {
                  const thread = activeThreadMessage.threads?.find(t => t.id === activeSubThreadId)
                    || activeThreadMessage.threads?.[0];
                  return thread?.messages.map(tMsg => (
                    <MessageNode
                      key={tMsg.id}
                      msg={tMsg}
                      isNested={true}
                    />
                  ));
                })()}
              </div>
              <div className="thread-reply-area">
                {(threadMode === 'create' || !activeThreadMessage.threads || activeThreadMessage.threads.length === 0) && (
                  <div className="reply-preview">
                    <div className="reply-preview-content">
                      <div className="reply-preview-details">
                        <div className="reply-preview-subject">
                          <span>{threadMode === 'create' ? 'Start New Thread' : 'Reply to Thread'}</span>
                        </div>
                        <div className="reply-quoted-text">
                          {activeThreadMessage.content}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <input type="text" className="stream-input" placeholder={threadMode === 'create' ? "Start a thread..." : "Reply to thread..."} />
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;
