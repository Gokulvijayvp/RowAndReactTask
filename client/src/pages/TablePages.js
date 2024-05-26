import React from 'react'
import TableForm from '../components/TableForm';
import TableList from '../components/TableList';

const TablePages = () => {
    

  return (
    <div className="container mx-auto pb-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center my-4">React Table Task</h1>
        <TableForm /> 
        <TableList />
      </div>
  )
}

export default TablePages