import React, { useEffect, useState } from 'react'
import "./OrdersPage.css"

export default function OrdersPage() {


  const [orders, setOrders] = useState([]);

  useEffect(() =>{
    async function getAllOrders(){
      let res = await fetch("http://localhost:8000/order/");
      let data = await res.json();
      console.log(data)

      setOrders([...data.orders]);
    }

    getAllOrders();
  },[]);

  return (
    <div id='ordersContainer'>
      {orders.map((item) => {

        return (
          <div className='orderItem' key={item._id}>
            <div className='orderItemName'>
              <p>{item.name}</p>
            </div>
            <div className='orderItemDetails'>
              <p> <b>Total Price </b>{item.price}</p>
              <p><b>Quantity </b>{item.quantity}</p>
            </div>
          </div>
        )

      })}
    </div>
  )
}
