import React, { useEffect, useState } from 'react'
import "./CartPage.css";

export default function CartPage() {


  const [cart, setCart] = useState([]);
  useEffect(()=>{

    async function getCartItems(){
      let res = await fetch("http://localhost:8000/cart/");
      let data = await res.json();
      console.log(data)
      setCart([...data.cartItems])
    }

    getCartItems();
  },[]);
  return (
    <div id='cartContainer'>
      {cart.map((item) => {
        return (
          <div className='cartItem' key={item._id}>
            <div className='cartItemName'>
              <p>{item.name}</p>
            </div>
            <div className='cartItemDetails'>
              <p> <b>Total Price </b>{item.price}</p>
              <p><b>Quantity </b>{item.quantity}</p>
            </div>
            <div className='btn_group'>
              <button className='btn btn-primary'>+</button>
              <button className='btn btn-secondary'>-</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
