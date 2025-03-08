import React, { useContext, useState } from 'react'
import {GlobalState} from "../../GlobalState"
import {Link} from "react-router-dom";

import Menu from "./icons/bar.svg"
import Cart from "./icons/cart.svg"
import Close from "./icons/close.svg"  // go to fontawesome to download the icons....
import "./Header.css"
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
   const [cart] = state.userAPI.cart
   const logoUrl= "https://res.cloudinary.com/dc2qdnnqb/image/upload/v1739528726/TasteMaghribi_zvdb05.png"
    const adminRouter = () =>{
        return (
            <>
            <li><Link to="/create_product">Créer un produit</Link></li>
            <li><Link to="/category">Catégories</Link></li>
            </>
        )
    }
const loggedOut = async () =>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
}
    const loggedRouter = () =>{
        return (
            <>
            
            <li><Link to="/" onClick={loggedOut}>Se déconnecter</Link></li>
            </>
        )
    }
    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!menu)
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>
          <div className="menu" onClick={()=>setMenu(!menu)}>
              <img src={Menu} alt="" width="30"/>
          </div>
          <div className="logo">
          <img src={logoUrl} alt="Logo" className="logo-img" />
              <h1>
    
                <Link to="/">{isAdmin ? 'Admin' : 'TasteMaghribi'}</Link>
              </h1>
          </div>

          <ul style={styleMenu}>
              <li><Link to="/">{isAdmin ? 'Products' : 'Accueil'}</Link></li>
              {
                  isAdmin && adminRouter()
              }{
                  isLogged ? loggedRouter() :  <li><Link to="/login">Se connecter</Link></li>
              }
             
              <li onClick={()=>setMenu(!menu)}>
                  <img src={Close} alt="" width="30" className="menu"/>
              </li>
          </ul>
{       isAdmin ?  ' '
          : <div className="cart-icon">
              <span>{cart.length}</span>
              <Link to="/cart">
                  <img src={Cart} alt="" width="40"/>
              </Link>
          </div>
}
        </header>
    )
}

export default Header