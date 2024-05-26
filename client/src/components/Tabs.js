import React, { useState } from 'react';
import RowPages from '../pages/RowPages';
import TablePages from '../pages/TablePages';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('row');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'row':
        return <RowPages/>;
      case 'table':
        return <TablePages/>;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-white">
      <div className="h-full  container mx-auto p-4">
        <ul className="tabSec flex mb-4 w-ful border-b-neutral-500  "style={{borderBottom: "1px solid #dee2e6"}}  >
          <li 
            onClick={() => setActiveTab('row')}
            className={`px-8 py-3  cursor-pointer   ${activeTab === 'row' ? 'bg-white text-gray-800 active ' : 'bg-gray-200 text-gray-800'} text-xs font-bold `}
          >
            Row
          </li>
          <li
            onClick={() => setActiveTab('table')}
            className={`px-8 py-3 cursor-pointer ${activeTab === 'table' ? 'bg-white text-gray-800 active' : 'bg-gray-200 text-gray-800'}  text-xs font-bold `}
          >
            Table
          </li>
        </ul>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Tabs;
