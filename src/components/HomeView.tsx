import { useState } from 'react';
import type { Subject, ViewType } from '../types';
import { Eye, Clock, ArrowRight, Network } from 'lucide-react';
import { FilterBar } from './FilterBar';
import './HomeView.css';

interface HomeViewProps {
    subjects: Subject[];
    onSelectSubject: (id: string) => void;
}

export function HomeView({ subjects, onSelectSubject }: HomeViewProps) {
    const [view, setView] = useState<ViewType>('list');

    const mostViewed = [...subjects]
        .filter(s => s.category !== 'Folder')
        .sort((a, b) => b.views - a.views).slice(0, 3);
    const recent = [...subjects]
        .filter(s => s.category !== 'Folder')
        .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 4);

    return (
        <div className="home-view">
            <header className="home-header">
                <h1>Welcome Back</h1>
                <p className="text-muted">Jump back into your knowledge streams or start exploring.</p>
            </header>

            <FilterBar currentView={view} onViewChange={setView} />

            {view === 'list' ? (
                <>
                    <section className="home-section">
                        <h2 className="section-title">
                            <Eye size={18} />
                            Most Viewed
                        </h2>
                        <div className="card-grid">
                            {mostViewed.map(subject => (
                                <div key={subject.id} className="subject-card card" onClick={() => onSelectSubject(subject.id)}>
                                    <div className="card-category">{subject.category}</div>
                                    <h3 className="card-title">{subject.title}</h3>
                                    <div className="card-footer">
                                        <span className="card-meta">
                                            <Eye size={14} /> {subject.views} views
                                        </span>
                                        <button className="btn btn-ghost btn-sm card-action">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="home-section">
                        <h2 className="section-title">
                            <Clock size={18} />
                            Recent Streams
                        </h2>
                        <div className="card-grid">
                            {recent.map(subject => (
                                <div key={subject.id} className="subject-card card" onClick={() => onSelectSubject(subject.id)}>
                                    <div className="card-category">{subject.category}</div>
                                    <h3 className="card-title">{subject.title}</h3>
                                    <div className="card-footer">
                                        <span className="card-meta">
                                            <Clock size={14} /> {new Date(subject.lastUpdated).toLocaleDateString()}
                                        </span>
                                        <button className="btn btn-ghost btn-sm card-action">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <div className="mindmap-placeholder card">
                    <Network size={48} className="text-muted" style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <h3>Mind Map View</h3>
                    <p className="text-muted">Interactive spatial visualization of your subjects.</p>
                </div>
            )}
        </div>
    );
}
