import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from "../../../GlobalState"
import {Link} from "react-router-dom"
import axios from "axios"
import "./Cart.css"

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
   const [token] = state.token;

    useEffect(()=>{
            const getTotal = () =>{
                
                const total = cart.reduce((prev,item)=>{
                    const price = Number(item.price);  // Assurez-vous que le prix est un nombre
            const quantity = Number(item.quantity);
            return prev + (price * quantity)
             
                },0);
                
                setTotal(total);
            };
                getTotal();
    },[cart]);

    const addToCart = async () =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization : token}
        });
    };

    const increment =(id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart ([...cart])
        addToCart()
    }
    const decrement =( id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -=1
            }
        })
        setCart ([...cart])
        addToCart()
    }

    const removeProduct = (id) =>{
        if(window.confirm("Do you want to delete this Product")){
            cart.forEach((item, index)=>{
                if(item._id === id){
                    cart.splice(index,1)
                }
            })
       setCart([...cart])
       addToCart()
        }
    }
    if(cart.length === 0) return <h2 style={{textAlign: 'center', fontSize: "3rem", color: "#50280f"}}>  Votre panier est vide 🛒</h2>
    return (
        <div>
        {
            cart.map(product => (
                <div className="detail cart"key={product._id}>
                <img src={product.images.url} alt="" className="img_container"/>
                <div className="box-detail">
                    
                <h2>{product.title}</h2>
                       
                    
                <h5>{(Number(product.price) && Number(product.quantity)) ? Number(product.price) * Number(product.quantity) : 'Invalid Price/Quantity'} DH</h5>

                    <p> <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Content : </h4>{product.content}</p>
                    <p> <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Description : </h4>{product.description}</p>
                    <div className="amount">
                        <button onClick={()=> decrement(product._id)}> - </button>
                        <span>{Number(product.quantity)}</span>
                        <button  onClick={()=> increment(product._id)}> + </button>
                    </div>
                 <div className="delete" onClick={()=>removeProduct(product._id)}> x </div>
                
            </div>
            </div>
            ))
        }
        <div className="total">
            <h3>Total : {total}DH</h3>
            <Link id="btn_buy" to="#"> Payer</Link>
        </div>
        </div>
    )
}

export default Cart