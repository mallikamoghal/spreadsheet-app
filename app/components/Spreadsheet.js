'use client';
import React, { useState, useEffect } from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import { FaSearch } from 'react-icons/fa';

const Spreadsheet = () => {
    const {
        data,
        updateCell,
        currentPage,
        setCurrentPage,
        styles,
    } = useSpreadsheet();

    const cellsPerPage = 100;
    const pages = Math.ceil(data.length / cellsPerPage);
    const start = currentPage * cellsPerPage;
    const end = start + cellsPerPage;

    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setHighlightedCells([]);
            return;
        }
        const newHighlightedCells = data.map((cell, index) =>
            cell.toLowerCase().includes(searchQuery.toLowerCase()) ? index : -1
        ).filter(index => index !== -1);

        setHighlightedCells(newHighlightedCells);
    }, [searchQuery, data]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
    };

    const handleCellInputChange = (index, value) => {
        const regex = /^[a-zA-Z0-9\s]*$/;
        if (regex.test(value)) {
            setHistory([...history, data]);
            setRedoStack([]); 
            updateCell(index, value);
        } else {
            alert('Special characters are not allowed.');
        }
    };

    const undo = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setRedoStack([data, ...redoStack]); 
            updateCellBulk(lastState); 
            setHistory(history.slice(0, -1)); 
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack[0];
            setHistory([...history, data]); 
            updateCellBulk(nextState); 
            setRedoStack(redoStack.slice(1)); 
        }
    };

    const updateCellBulk = (newData) => {
        newData.forEach((value, index) => updateCell(index, value, true)); 
    };

    const renderCells = () => {
        return data.slice(start, end).map((cell, index) => {
            const isHighlighted = highlightedCells.includes(index + start);

            return (
                <td key={index + start} style={{ backgroundColor: isHighlighted ? '#CADFD4' : 'white' }}>
                    <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellInputChange(index + start, e.target.value)}
                        style={{
                            fontWeight: styles.bold ? 'bold' : 'normal',
                            fontStyle: styles.italic ? 'italic' : 'normal',
                            textAlign: styles.alignment,
                            padding: '5px',
                            border: '1px solid #ddd',
                        }}
                    />
                </td>
            );
        });
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="page-container">
            <div className="toolbar">
         

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button onClick={handleSearchClick} className="search-button">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <tbody>
                        {[...Array(10)].map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {renderCells().slice(rowIndex * 10, (rowIndex + 1) * 10)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
                {[...Array(pages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i)}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pages - 1}>Next</button>
            </div>
        </div>
    );
};

export default Spreadsheet;
