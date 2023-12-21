import React, { useEffect, useState } from 'react'
import "./HomePage.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {


    const [mobiles, setMobiles] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterOption, setFilterOption] = useState("name");

    useEffect(()=>{
        async function getMobiles(){
            let res = await fetch("http://localhost:8000/mobiles");
            let data = await res.json();
            console.log(data);
            setMobiles([...data.mobiles]);
        }
        getMobiles();
        toast("Welcome to Mobile App !")
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
            toast("Item Added To Cart !")
            return;
        }


    }


    function handleSearchChange(e){
        setSearchText(e.target.value);
    }
    function handleFilterOptionChange(e){
        setFilterOption(e.target.value);
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        console.log(searchText);
        console.log(filterOption);
        if(searchText && filterOption){
            let res = await fetch("http://localhost:8000/mobiles/search", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    searchText,
                    filterOption
                }),
                mode: "cors"
            });

            let data = await res.json();
            console.log(data);
            setMobiles([...data.mobiles])
            toast(data.mobiles.length +" mobiles found")
        }
    }

    return (
        <>
            <div id='formContainer'>
                <form>
                    <div>
                        <input onChange={handleSearchChange} value={searchText} className='form-control' type='text' required placeholder='Search...' />
                    </div>
                    <div>
                        <select onChange={handleFilterOptionChange} className='form-control' name='type' value={filterOption} required>
                            <option value="name">name</option>
                            <option value="processor">processor</option>
                            <option value="type">type</option>
                            <option value="OS">OS</option>
                            <option value="memory">memory</option>
                        </select>
                    </div>
                    <div className='btnContainer'>
                        <button onClick={handleFormSubmit} className='btn btn-primary'>Search</button>
                    </div>
                </form>
            </div>
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
        </>
    )
}
