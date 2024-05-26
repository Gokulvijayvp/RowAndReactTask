import React from 'react'
import { useUserContext } from '../mycontext/context';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RowEdit } from './RowEdit';
import DeleteModel from './DeleteModel';

const RowList = () => {
    const {state,dispatch} = useUserContext()
    
    const handleUpdateRows = async (id) => {
      
      dispatch({ type: 'openUp', payload: true });
      dispatch({ type: 'rowEditId', payload: id });
      
    };
  
    
    const handleDeleteClick = (id) => {
      dispatch({ type: 'deletebox', payload: true });
      dispatch({ type: 'rowDelId', payload: id });
  };


  return (
    <div className='p-4'>
      
       {state.openUp && <RowEdit/>} 
       {state.deletebox && <DeleteModel/>} 
      {state.rowData.length === 0 ? (
            <div>
              <div className="text-center py-4 text-xs font-bold">No data available</div>
            </div>
        ): (
          
        <div className="mt-4">
          <h2 className="text-xl mb-4 font-bold">Submitted Data:</h2>
          <div className="overflow-y-auto max-h-[70vh]">
            <ul className="border p-2 rounded flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <li className="w-full md:w-1/5 text-center md:text-left"><strong>Name</strong></li>
              <li className="w-full md:w-1/5 text-center md:text-left"><strong>Email</strong></li>
              <li className="w-full md:w-1/5 text-center md:text-left"><strong>Mobile</strong></li>
              <li className="w-full md:w-1/5 text-center md:text-left"><strong>PAN</strong></li>
              <li className="w-full md:w-1/5 text-center md:text-left"><strong>Actions</strong></li>
            </ul>
            <ul>
              {state.rowData.map((row, index) => (
                <li
                  key={index}
                  className="border p-2 rounded flex flex-col md:flex-row items-center gap-2 md:gap-4 shadow mb-4 md:mb-2"
                >
                  <div className="w-full md:w-1/5 text-center md:text-left capitalize">{row.name}</div>
                  <div className="w-full md:w-1/5 text-center md:text-left">{row.email}</div>
                  <div className="w-full md:w-1/5 text-center md:text-left">{row.mobile}</div>
                  <div className="w-full md:w-1/5 text-center md:text-left">{row.pan}</div>
                  <div className="w-full md:w-1/5 flex justify-center md:justify-start gap-2 md:gap-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleUpdateRows(row._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(row._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div> 
  )
}

export default RowList