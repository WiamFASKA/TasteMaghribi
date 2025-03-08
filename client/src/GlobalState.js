import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from "./api/ProductsAPI"
import UserAPI from "./api/UserAPI"
import CategoriesAPI from "./api/CategoriesAPI"




export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken]= useState(false)
    const refreshToken = async () =>{
        const res = await axios.get('http://localhost:5000/user/refresh_token', { withCredentials: true });
        console.log("Token reçu après refresh :", res.data.accesstoken);
        setToken(`Bearer ${res.data.accesstoken}`)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
       
        
    }, [])

    ProductsAPI()

    const state ={
        token : [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI:UserAPI(token),
        categoriesAPI:CategoriesAPI(token)
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}