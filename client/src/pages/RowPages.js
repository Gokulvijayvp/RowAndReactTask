import React, { useState } from 'react'
import RowForm from '../components/RowForm';
import RowList from '../components/RowList';

const RowPages = () => {
    const [activeTab, setActiveTab] = useState('form');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'form':
        return <RowForm/>;
      case 'list':
        return <RowList/>;
      default:
        return null;
    }
  };

  return (
    <div>
        <div className="container mx-auto p-4 pt-0">
          <h1 className="text-2xl font-bold text-center my-4">React Row Task</h1>
            <div className="flex space-x-2 rowTabSec w-44 bg-gray-200 p-2 rounded">
                <button
                onClick={() => setActiveTab('form')}
                className={`p-2 ${activeTab === 'form' ? 'bg-cyan-800    text-white' : 'bg-white text-gray-800'} rounded w-1/2 text-xs font-bold`}
                >
                Form
                </button>
                <button
                onClick={() => setActiveTab('list')}
                className={`p-2 ${activeTab === 'list' ? 'bg-cyan-800 text-white' : 'bg-white text-gray-800'} rounded w-1/2 text-xs font-bold`}
                >
                List
                </button>
            </div>
            <div>{renderTabContent()}</div>
        </div>
    </div>
  )
}

export default RowPages