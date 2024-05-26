import React from 'react'
import { RiCloseFill } from "react-icons/ri";
import { useUserContext } from '../mycontext/context'

const DeleteTable = () => {
    const {state,dispatch,client} = useUserContext()
    const closeModel = () =>{
        dispatch({ type: 'deleteTBbox', payload: false });
    }
    
    const crsData = state.tableData.find(user => user._id === state.tabelDelId);
    const nameDel = crsData?.name; 
     
    const handleTableDelete = async (id) => {
        try {
          await client.delete(`/api/deletetable/${id}`);
          const updatedData = state.tableData.filter((users) => users._id !== id);
          dispatch({ type: 'tableData', payload: updatedData });
          closeModel()
        } catch (error) {
          console.log(error);
        }
    };

  return (
    <div>
        <div className="modelOverview fixed inset-0  bg-opacity-50 flex items-center justify-center">
            <div className="model bg-white rounded-lg shadow-lg w-full max-w-4xl">
                <div className="w-full flex justify-between col-span-12 p-3 border-b">
                    <h4 className="text-black inline-block">Delete Table Data</h4>
                    <button className="inline-block ml-auto bg-transparent border border-gray-300 text-gray-700 py-1 px-2 rounded-sm text-sm hover:bg-gray-100" onClick={closeModel}>
                    <RiCloseFill className="inline-block" />
                    </button>

                    </div>
                    <div className="col-span-12 p-3 py-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                        <strong className="font-bold">Alert!</strong>
                        <span className="block sm:inline">
                        Are you sure you want to delete <span className="capitalize">{nameDel}</span>?
                        </span>
                    </div>
                    </div>
                    <div className="w-full p-3 border-t col-span-12">
                    <button className="bg-red-500 text-white py-1 px-2 rounded-sm text-sm  float-right" onClick={() => handleTableDelete(state.tabelDelId)}>
                        Delete
                        </button>
                        <button className="bg-transparent border border-gray-300 text-gray-700 py-1 mr-4 px-2 rounded-sm text-sm float-right" onClick={closeModel}>
                        Cancel
                        </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default DeleteTable