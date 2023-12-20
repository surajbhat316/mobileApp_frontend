import React, { useEffect, useState } from 'react'
import "./HomePage.css";

export default function HomePage() {


    const [mobiles, setMobiles] = useState([]);

    useEffect(()=>{
        async function getMobiles(){
            let res = await fetch("http://localhost:8000/mobiles");
            let data = await res.json();
            console.log(data);
            setMobiles([...data.mobiles]);
        }
        getMobiles();
    },[]);

    const handleAddToCart = async (e, id, price, name)=>{

        if(id && price && name){
            let res = await fetch("http://localhost:8000/cart/addItem", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:id,
                    price: price,
                    name: name
                }),
                mode: "cors"
            });

            let data = await res.json();
            console.log(data)
            return;
        }


    }
    return (
        <div id='mobilesContainer'>

            {mobiles.map((mobile, i)=>{
                return( 
                    <div className='mobile' key={mobile._id}>
                        <div className='mobileName'>
                            <p>
                                {mobile.name}
                            </p>
                        </div>
                        <div className='mobileDesc'>
                            <p>
                                <b>Price </b>{mobile.price}
                            </p>
                            <p>
                                <b>Memory </b>{mobile.memory}
                            </p>
                            <p>
                                <b>Processor </b>{mobile.processor}
                            </p>
                            <p>
                                <b>OS </b>{mobile.OS}
                            </p>
                            <p>
                                <b>Type </b>{mobile.type}
                            </p>

                            <button onClick={(e) => handleAddToCart(e, mobile._id,mobile.price, mobile.name)} className='btn btn-primary'>Add to cart</button>
                        </div>
                    </div>
                )
            } )}
        </div>
    )
}
