import React from 'react';
import Toolbar from './components/Toolbar';
import Spreadsheet from './components/Spreadsheet';


const Page = () => {
  return (
    <div className="page-container">
      <Toolbar />
      <Spreadsheet />
    </div>
  );
};

export default Page;
