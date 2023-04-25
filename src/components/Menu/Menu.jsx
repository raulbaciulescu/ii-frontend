import React, { useState } from 'react';
import './Menu.css';

const chapters = [
    { id: 1, title: 'Chapter 1' },
    { id: 2, title: 'Chapter 2' },
    { id: 3, title: 'Chapter 3' },
    { id: 4, title: 'Chapter 4' }
];

export const Menu = () => {
    const [selectedId, setSelectedId] = useState(chapters[0].id);

    const handleItemClick = (id) => {
        setSelectedId(id);
    };

    return (
        <div className="left-menu">
            {chapters.map((chapter) => (
                <div
                    key={chapter.id}
                    className={selectedId === chapter.id ? 'selected' : ''}
                    onClick={() => handleItemClick(chapter.id)}
                >
                    {chapter.title}
                </div>
            ))}
        </div>
    );
};