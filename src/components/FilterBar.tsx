import { useState } from 'react';
import type { ViewType } from '../types';
import { List, Network, Calendar, Tag, ShieldAlert, Filter } from 'lucide-react';
import './FilterBar.css';

interface FilterBarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export function FilterBar({ currentView, onViewChange }: FilterBarProps) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const toggleFilter = (filter: string) => {
        if (activeFilter === filter) setActiveFilter(null);
        else setActiveFilter(filter);
    };

    return (
        <div className="filter-bar">
            <div className="filter-group">
                <span className="filter-label">
                    <Filter size={14} className="text-muted" /> LATCH
                </span>
                <button
                    className={`btn-filter ${activeFilter === 'time' ? 'active' : ''}`}
                    onClick={() => toggleFilter('time')}
                >
                    <Calendar size={14} /> Time
                </button>
                <button
                    className={`btn-filter ${activeFilter === 'category' ? 'active' : ''}`}
                    onClick={() => toggleFilter('category')}
                >
                    <Tag size={14} /> Category
                </button>
                <button
                    className={`btn-filter ${activeFilter === 'hierarchy' ? 'active' : ''}`}
                    onClick={() => toggleFilter('hierarchy')}
                >
                    <ShieldAlert size={14} /> Hierarchy
                </button>
            </div>

            <div className="view-toggles">
                <button
                    className={`btn-toggle ${currentView === 'list' ? 'active' : ''}`}
                    onClick={() => onViewChange('list')}
                    title="List View"
                >
                    <List size={16} />
                </button>
                <button
                    className={`btn-toggle ${currentView === 'mindmap' ? 'active' : ''}`}
                    onClick={() => onViewChange('mindmap')}
                    title="Mind Map View"
                >
                    <Network size={16} />
                </button>
            </div>

            {activeFilter && (
                <div className="filter-dropdown card fade-in">
                    {activeFilter === 'time' && (
                        <div className="filter-options">
                            <label><input type="radio" name="time" defaultChecked /> Recent</label>
                            <label><input type="radio" name="time" /> Last 7 Days</label>
                            <label><input type="radio" name="time" /> Custom Range...</label>
                        </div>
                    )}
                    {activeFilter === 'category' && (
                        <div className="filter-options">
                            <label><input type="checkbox" defaultChecked /> Work</label>
                            <label><input type="checkbox" defaultChecked /> Study</label>
                            <label><input type="checkbox" defaultChecked /> Personal</label>
                        </div>
                    )}
                    {activeFilter === 'hierarchy' && (
                        <div className="filter-options">
                            <label><input type="radio" name="hier" defaultChecked /> Most Viewed</label>
                            <label><input type="radio" name="hier" /> Pinned First</label>
                            <label><input type="radio" name="hier" /> Importance Score</label>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
