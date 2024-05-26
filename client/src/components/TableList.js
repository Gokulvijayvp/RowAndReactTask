import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useUserContext } from '../mycontext/context';
import DeleteTable from './DeleteTable';

const TableList = () => {
  const { state, dispatch } = useUserContext();

  const handleEdit = (index,Id) => {
    dispatch({ type: 'editIndex', payload: index });
    dispatch({ type: 'editId', payload: Id });
    dispatch({ type: 'isEdit', payload: true });

    const editData = state.tableData[index];
    dispatch({ type: 'formValues', payload: { name: editData.name, email: editData.email, mobile: editData.mobile } });
  };
  
  
  const handleDeleteClick = (id) => {
    dispatch({ type: 'deleteTBbox', payload: true });
    dispatch({ type: 'tabelDelId', payload: id });
  };
  

  return (
    <div className="overflow-x-auto mt-6">
        {state.deleteTBbox && <DeleteTable/>}
        {state.tableData.length === 0 ? (
        <div className="text-center py-4 text-xs font-bold">No data available</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(state.tableData) && state.tableData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-3 flex justify-around">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(index,item._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableList;
