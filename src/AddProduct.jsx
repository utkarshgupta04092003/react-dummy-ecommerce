import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './App.css';
import { ADD_2 } from './redux/actions/action';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
    const [price,setPrice]=useState("");
    const navigate=useNavigate();
    const products= useSelector((state)=>state.productReducer.products);
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();

        const checkImage=products.find(product=>product.image===image && image);

        if(!title || !image || !price)
        {
            return toast.warning("Please fill in all the fields ! ");
        }

        if(checkImage)
        {
            return toast.error("This url already exists ! ");
        }

        const data={
            id: products[products.length-1].id + 1 ,
            title,
            image,
            price
        }

        console.log(data);
        dispatch(ADD_2(data));
        toast.success("Product Added Successfully !!");
        navigate("/");

    }
    return (
        <div className='container'>
        <div className='row'>
        <h2 className='display-3 text-center my-3'>
        ADD A Product
        </h2>

        <div className='col-md-6 shadow mx-auto p-5'>
        <form onSubmit={handleSubmit}>
            <div className='form-group my-3'>
            <input type="text" placeholder="Name" className='form-control'
                value={title} onChange={e=>setTitle(e.target.value)}
            />
            </div>

            <div className='form-group my-3'>
            <input type="text" placeholder="Image Url" className='form-control'
                value={image} onChange={e=>setImage(e.target.value)}
            />
            </div>


            <div className='form-group my-3'>
            <input type="number" placeholder="Price" className='form-control'
                value={price} onChange={e=>setPrice(e.target.value)}
            />
            </div>

            <div className='form-group my-3 btn-block'>
            <input type="submit" value="Add Product" className='btn btn-block form-control bg-primary'/>
            </div>
        </form>

        </div>

        </div>
        </div>
    );
};

export default AddProduct;