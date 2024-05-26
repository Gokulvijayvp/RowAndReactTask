import React, { useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { useUserContext } from '../mycontext/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const tableSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required')
});

const TableForm = () => {
  
  const {state,dispatch,client} = useUserContext() 

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    resolver: yupResolver(tableSchema)
  });

 useEffect(() => {
    reset(state.formValues);
  }, [state.formValues, reset]);

  const onSubmit = async(formData) => {
    if (state.isEdit && state.editIndex !== null && state.editId !== null) {
        try{
          const response = await client.put(`/api/updatetable/${state.editId}`, formData);
          const updatetable = await response.data;
          console.log("Data:", updatetable.data);
          const updatedData = state.tableData.map((item, index) =>
            item._id === state.editId ? updatetable.data : item
          );

          dispatch({ type: 'tableData', payload: updatedData });
          dispatch({ type: 'formValues', payload: { name: '', email: '', mobile: '' } });
        }catch(error){
            console.log(error)
        }
    } else {
      try{
        const response = await client.post("/api/newtabledata", formData);
        const newtable = response.data;
        dispatch({ type: 'tableData', payload: [...state.tableData, newtable.data] });
      }catch(error){
        console.log(error)
      }
    }
      dispatch({ type: 'formValues', payload: { name: '', email: '', mobile: '' } });
      reset();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'formValues', payload: { ...state.formValues, [name]: value } });
  };

  return (
    <div className='border  rounded mb-4 p-5'>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center mb-4 space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/4">
              <label className='text-sm font-bold' htmlFor={`name`}>Name</label>
              <input
                type="text"
                placeholder="Please enter the name"
                className="border p-2 rounded w-full mt-2 text-sm"
                id={`name`}
                {...register('name')}
                value={state.formValues.name}
                onChange={handleInputChange}
              />
              
              {errors?.name && (
                <div className="form-text error text-red-600 text-xs m-2">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/4">
              <label className='text-sm font-bold' htmlFor={`email`}>Email address</label>
              <input
                type="email"
                className="border p-2 rounded w-full mt-2 text-sm"
                placeholder="Please enter the email"
                id={`email`}
                {...register('email')}
                value={state.formValues.email}
                onChange={handleInputChange}
              />
              {errors?.email && (
                <div className="form-text error text-red-600 text-xs m-2">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/4">
              <label className='text-sm font-bold' htmlFor={`mobile`}>Mobile</label>
              <input
                type="number"
                className="border p-2 rounded w-full mt-2 text-sm"
                placeholder="Please enter the mobile number"
                id={`mobile`}
                {...register('mobile')}
                value={state.formValues.mobile}
                onChange={handleInputChange}
              />
              {errors?.mobile && (
                <div className="form-text error text-red-600 text-xs m-2">
                  {errors.mobile.message}
                </div>
              )}
            </div>
          </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded text-xs font-bold">
          {state.isEdit ? 'Save' : 'Submit'} <FaSave className="inline ml-2" />
        </button>
      </form>
    </div>
  );
};

export default TableForm;
