import React from 'react';
import { useForm ,useFieldArray} from 'react-hook-form';
import { AiOutlinePlus,AiOutlineSave} from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserContext } from '../mycontext/context';



const RowForm = () => {
  const {state,dispatch ,client,rowSchema} = useUserContext()
    
  const { register, handleSubmit, control,reset, formState: { errors } } = useForm({
    resolver: yupResolver(rowSchema),
    defaultValues: {
      rows: [{ name: '', email: '', mobile: '', pan: '' }]
    }
  });

  const { fields, append } = useFieldArray({ control, name: 'rows' });

  const onSubmit = async (data) => {
    const response = await client.post("/api/newrows", data);
    
    dispatch({ type: 'rowData', payload: [...state.rowData, ...response.data.data] });
    reset({
      rows: [{ name: '', email: '', mobile: '', pan: '' }]
    });
  };
  
  return (
    <div>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-auto mb-4 rowHeight">
        {fields.map((item, index) => (
          <div key={item.id} className='border rounded mb-4 p-5'>
            <span className='font-bold text-xs text-gray-400 '>{`Row ${index +1}`}</span>
            <div className="flex flex-col lg:flex-row lg:space-x-4 items-center mb-4 space-y-4 lg:space-y-0">
              <div className="w-full lg:w-1/4">
                <label className='text-sm font-bold' htmlFor={`rows[${index}].name`}>Name</label>
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
                <label className='text-sm font-bold' htmlFor={`rows[${index}].email`}>Email address</label>
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
                <label className='text-sm font-bold' htmlFor={`rows[${index}].mobile`}>Mobile</label>
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
                <label className='text-sm font-bold ' htmlFor={`rows[${index}].pan`}>PAN</label>
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

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => append({ name: '', email: '', mobile: '', pan: '' })}
              className="flex items-center p-4 bg-blue-500 text-white rounded h-7 text-xs font-bold"
            >
              <AiOutlinePlus className="mr-2 text-sm" /> Add Row
            </button>
            <button
              type="submit"
              className="flex items-center p-4  bg-green-500 text-white rounded h-7 text-xs font-bold"
            >
              <AiOutlineSave className="mr-2 text-sm" /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RowForm;
