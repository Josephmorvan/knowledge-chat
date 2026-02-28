export type ViewType = 'list' | 'mindmap' | 'timeline';

export interface Subject {
  id: string;
  title: string;
  category: string;
  isPinned: boolean;
  isArchived: boolean;
  views: number;
  lastUpdated: string;
  parentId?: string;
}

export type MessageRole = 'user' | 'ai' | 'system';
export type BranchType = 'aside' | 'exploratory';

export interface Reference {
  id: string;
  subjectId: string;
  snippet: string;
}

export interface Branch {
  id: string;
  type: BranchType;
  messages: Message[];
  isMerged: boolean;
  mergeSummary?: string;
}

export interface Message {
  id: string;
  subjectId: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  isSoftBoundaryStarted?: boolean;
  boundaryLabel?: string;
  branch?: Branch;
  references?: Reference[];
  threadMessages?: Message[];
  threadCount?: number;
}
