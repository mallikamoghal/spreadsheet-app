'use client';
import React from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';

const Toolbar = () => {
    const { toggleBold, toggleItalic, changeAlignment, undo, redo, history, redoStack } = useSpreadsheet();

    return (
        <div className="toolbar flex flex-wrap justify-between items-center space-x-2 p-2 bg-gray-100 w-full overflow-x-auto">
            <button className="btn text-sm md:text-base" onClick={toggleBold}>Bold</button>
            <button className="btn text-sm md:text-base" onClick={toggleItalic}>Italic</button>
            <button className="btn text-sm md:text-base" onClick={() => changeAlignment('left')}>Left</button>
            <button className="btn text-sm md:text-base" onClick={() => changeAlignment('center')}>Center</button>
            <button className="btn text-sm md:text-base" onClick={() => changeAlignment('right')}>Right</button>
            <button className="btn text-sm md:text-base" onClick={undo} disabled={history.length === 0}>Undo</button>
            <button className="btn text-sm md:text-base" onClick={redo} disabled={redoStack.length === 0}>Redo</button>
        </div>
    );
};

export default Toolbar;
