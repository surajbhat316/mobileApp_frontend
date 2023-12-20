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


  async function handleIncrease(e , id, name, unitPrice, product_id){

    let res = await fetch("http://localhost:8000/cart/addItem", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:product_id,
                    price: unitPrice,
                    name: name
                }),
                mode: "cors"
            });

    let data = await res.json();
    console.log(data)

    let updatedCart = cart.map((item) =>{
      if(item._id === id){
        item.quantity = item.quantity + 1;
        item.price = item.quantity * item.unitPrice;
      }
      return item
    })

    setCart([...updatedCart])
  }

  async function handleDecrease(e , id, product_id, unitPrice){

    let res = await fetch("http://localhost:8000/cart/deleteItem", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:product_id,
                    price: unitPrice,
                }),
                mode: "cors"
            });

    let data = await res.json();
    console.log(data)





    let updatedCart = cart.map((item) =>{
      if(item._id === id){

        if(item.quantity === 1){
          return null;
        }
        else{
          item.quantity = item.quantity - 1;
          item.price = item.quantity * item.unitPrice;
        }
      }
      return item
    })
    console.log(updatedCart)
    let newUpdatedList = removeNulls(updatedCart);
    setCart([...newUpdatedList])
  }

  function removeNulls(updatedCart){
    let newUpdatedList = [];
    for(let i=0;i<updatedCart.length;i++){
      if(updatedCart[i] !== null){
        newUpdatedList.push(updatedCart[i])
      }
    }
    return newUpdatedList;
  }


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
              <button onClick={(e) => handleIncrease(e, item._id, item.name, item.unitPrice, item.product_id)} className='btn btn-primary'>+</button>
              <button onClick={(e) => handleDecrease(e, item._id, item.product_id, item.unitPrice)} className='btn btn-secondary'>-</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
