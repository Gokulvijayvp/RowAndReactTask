import React, {useEffect, useReducer } from 'react';
import { createContext, useContext } from "react";
import { Reducer, initialState } from '../mycontext/reducer';
import axios from "axios";
import * as yup from 'yup';
const UserContext = createContext()


export function useUserContext(){
    return useContext(UserContext)
}

export default function UserProvider({children}) {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const client = axios.create({
        baseURL: "http://localhost:8080",
    });

    useEffect(() => {
        const fetchRowData = async () => {
            try {
                const res = await client.get("/api/rows");
                dispatch({ type: 'rowData', payload: res.data });
            } catch (error) {
                console.log(error);
            }
        };
        const fetchTableData = async () => {
            try {
                const res = await client.get("/api/tabledatas");
                dispatch({ type: 'tableData', payload: res.data });
            } catch (error) {
                console.log(error);
            }
        };
        fetchTableData();
        fetchRowData();
    }, []);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    yup.addMethod(yup.string, 'pan', function (errorMessage) {
        return this.test('pan', errorMessage, function (value) {
            const { path, createError } = this;
            return (
            panRegex.test(value) || createError({ path, message: errorMessage })
            );
        });
    });

    const rowSchema = yup.object().shape({
        rows: yup.array().of(
            yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email address').required('Email is required'),
            mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
            pan: yup.string().pan('Invalid PAN format').required('PAN is required'),
            })
        )
    }); 
    return (
        <UserContext.Provider value={{ state, dispatch ,client,rowSchema }}>
            {children}
        </UserContext.Provider>
    );
}
 