import React from 'react'
import { RiCloseFill } from "react-icons/ri";
import { useForm ,useFieldArray} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserContext } from '../mycontext/context';

export const RowEdit = () => {
    const {state, rowSchema,dispatch,client} = useUserContext()
  
    const id = state.rowEditId
    const usersData = state.rowData.find((row) => row._id.toString() === id)

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(rowSchema),
        defaultValues: {
          rows: [{ name: usersData.name, email:usersData.email, mobile: usersData.mobile, pan: usersData.pan }]
        }
      });
    
    const { fields } = useFieldArray({ control, name: 'rows' });
     
    const onSubmit = async(data) => {
        const datas = data;
        const rows = datas.rows[0];
    
        const response = await client.put(`/api/updaterow/${state.rowEditId}`, rows);
        const updaterow = await response.data;
        const updatedData = state.rowData.map((item, index) =>
        item._id === state.rowEditId ? updaterow.data : item
        );

        dispatch({ type: 'rowData', payload: updatedData });
        closeModel()
    };

    const closeModel = () =>{
        dispatch({ type: 'openUp', payload: false });
    }

  return (
    <div>
      {usersData && 
        <div className="modelOverview fixed inset-0  bg-opacity-50 flex items-center justify-center">
        <div className="model bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="w-full md:w-10/12 header border-b p-3 flex justify-between items-center">
                <h4 className="font-bold text-sm mb-0">Update Row</h4>
                <button
                    type="button"
                    className="bg-white border  border-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-100"
                    onClick={closeModel}
                >
                    <RiCloseFill className="text-lg" />
                </button>
            </div>

          <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-auto mb-4 rowHeight max-h-[50vh]">
                {fields.map((item, index) => (
                  <div key={item.id} className="border rounded mb-4 p-5">
                    
                    <div className="flex flex-col lg:flex-row lg:space-x-4 items-center mb-4 space-y-4 lg:space-y-0">
                      <div className="w-full lg:w-1/4">
                        <label
                          className="text-sm font-bold"
                          htmlFor={`rows[${index}].name`}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Please enter the name"
                          className="border p-2 rounded w-full mt-2 text-sm"
                          id={`rows[${index}].name`}
                          {...register(`rows[${index}].name`)}
                        />
                        {errors?.rows?.[index]?.name && (
                          <div className="form-text error text-red-600 text-xs m-2">
                            {errors.rows[index].name?.message}
                          </div>
                        )}
                      </div>
                      <div className="w-full lg:w-1/4">
                        <label
                          className="text-sm font-bold"
                          htmlFor={`rows[${index}].email`}
                        >
                          Email 
                        </label>
                        <input
                          type="email"
                          className="border p-2 rounded w-full mt-2 text-sm"
                          placeholder="Please enter the email"
                          id={`rows[${index}].email`}
                          {...register(`rows[${index}].email`)}
                        />
                        {errors?.rows?.[index]?.email && (
                          <div className="form-text error text-red-600 text-xs m-2">
                            {errors.rows[index].email?.message}
                          </div>
                        )}
                      </div>
                      <div className="w-full lg:w-1/4">
                        <label
                          className="text-sm font-bold"
                          htmlFor={`rows[${index}].mobile`}
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          className="border p-2 rounded w-full mt-2 text-sm"
                          placeholder="Please enter the mobile number"
                          id={`rows[${index}].mobile`}
                          {...register(`rows[${index}].mobile`)}
                        />
                        {errors?.rows?.[index]?.mobile && (
                          <div className="form-text error text-red-600 text-xs m-2">
                            {errors.rows[index].mobile?.message}
                          </div>
                        )}
                      </div>
                      <div className="w-full lg:w-1/4">
                        <label
                          className="text-sm font-bold"
                          htmlFor={`rows[${index}].pan`}
                        >
                          PAN
                        </label>
                        <input
                          type="text"
                          className="border p-2 rounded w-full mt-2 text-sm"
                          placeholder="Please enter the PAN"
                          id={`rows[${index}].pan`}
                          {...register(`rows[${index}].pan`)}
                        />
                        {errors?.rows?.[index]?.pan && (
                          <div className="form-text error text-red-600 text-xs m-2">
                            {errors.rows[index].pan?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="footer w-full p-3 border-t flex justify-end space-x-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-blue-700" type="submit">
                    Update
                </button>
                <button
                    type="button"
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-100"
                    onClick={closeModel}
                >
                    Close
                </button>
            </div>

            </form>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
   