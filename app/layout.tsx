"use client"; // Ensure this file is a client component

import './styles/globals.css';
import React from 'react';
import { SpreadsheetProvider } from './context/SpreadsheetContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <SpreadsheetProvider>
                    {children}
                </SpreadsheetProvider>
            </body>
        </html>
    );
};

export default Layout;
