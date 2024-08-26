'use client';
import React, { createContext, useState, useContext } from 'react';

const SpreadsheetContext = createContext();

export const SpreadsheetProvider = ({ children }) => {
    const [data, setData] = useState(Array.from({ length: 1000 }, () => ''));
    const [history, setHistory] = useState([]); 
    const [redoStack, setRedoStack] = useState([]); 
    const [styles, setStyles] = useState({
        bold: false,
        italic: false,
        alignment: 'left',
    });
    const [currentPage, setCurrentPage] = useState(0);

    const updateCell = (index, value) => {
        setHistory(prevHistory => [...prevHistory, [...data]]); 
        setRedoStack([]); 
        setData(prevData => {
            const newData = [...prevData];
            newData[index] = value;
            return newData;
        });
    };

    const toggleBold = () => setStyles(prevStyles => ({ ...prevStyles, bold: !prevStyles.bold }));
    const toggleItalic = () => setStyles(prevStyles => ({ ...prevStyles, italic: !prevStyles.italic }));
    const changeAlignment = (alignment) => setStyles(prevStyles => ({ ...prevStyles, alignment }));

    const undo = () => {
        if (history.length === 0) return;

        setRedoStack(prevRedoStack => [...prevRedoStack, [...data]]);
        const lastState = history[history.length - 1];
        setHistory(prevHistory => prevHistory.slice(0, -1));
        setData(lastState);
    };

    const redo = () => {
        if (redoStack.length === 0) return;

        setHistory(prevHistory => [...prevHistory, [...data]]);
        const nextState = redoStack[redoStack.length - 1];
        setRedoStack(prevRedoStack => prevRedoStack.slice(0, -1));
        setData(nextState);
    };

    return (
        <SpreadsheetContext.Provider value={{
            data,
            styles,
            updateCell,
            toggleBold,
            toggleItalic,
            changeAlignment,
            undo,
            redo,
            history,
            redoStack,
            currentPage,
            setCurrentPage,
        }}>
            {children}
        </SpreadsheetContext.Provider>
    );
};

export const useSpreadsheet = () => useContext(SpreadsheetContext);
