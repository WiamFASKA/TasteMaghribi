import React, {useContext}from 'react'
import {Routes, Route} from "react-router-dom"
import Products from "./products/Products"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Cart from "./cart/Cart"
import NotFound from "./utils/not_found/NotFound"
import DetailProduct from './products/detailProducts/DetailProduct'

import {GlobalState} from "../../GlobalState"
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
    return (
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" exact element={isLogged ? <NotFound/> : <Login/>}/>
          <Route path="/register" exact element={isLogged ? <NotFound/> : <Register/>}/>
          <Route path="/category" exact element={isLogged ? <Categories/> : <NotFound/> }/>
          <Route path="/create_product" exact element={isLogged ? <CreateProduct/> : <NotFound/> }/>
          <Route path="/edit_product/:id" exact element={isLogged ? <CreateProduct/> : <NotFound/> }/>
          <Route path="/cart" exact element={<Cart/>}/>
          <Route path="/detail/:id" exact element={<DetailProduct/>}/>
          <Route path="*" exact element={<NotFound/>}/>
        </Routes>
    );
}

export default Pages