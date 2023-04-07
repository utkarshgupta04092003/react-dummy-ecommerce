import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE } from './redux/actions/action';

const EditProduct = () => {
    const { id } = useParams();
    const dispatch=useDispatch();
    const history=useNavigate();

    const products= useSelector((state)=>state.productReducer.products);

    const currentProduct=products.find(product=>product.id===parseInt(id));
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
    const [price,setPrice]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        const checkImage=products.find(
            (product)=>product.id!=parseInt(id) && product.image===image );

        if(!title || !image || !price)
        {
            return toast.warning("Please fill in all the fields ! ");
        }

        if(checkImage)
        {
            return toast.error("This url already exists ! ");
        }

        const data={
            id: parseInt(id) ,
            title,
            image,
            price
        }

        console.log(data);
        dispatch(UPDATE(data));
        toast.success("Product Updated Successfully !!");
        history("/");
    }


        useEffect(()=>{

            if(currentProduct)
            {
                setTitle(currentProduct.title);
                setImage(currentProduct.image);
                setPrice(currentProduct.price);
            }
    
        },[currentProduct]);

    
       

    
    return (
        <div className='container'>
        {
            currentProduct?(
            <>
            <div className='row'>
        <h2 className='display-3 text-center my-3'>
        Edit Product {id}
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
            <input type="submit" value="Update Product" className='btn btn-block form-control bg-primary'/>
            </div>
        </form>

        </div>

        </div>

            </>
        ):
        (<h2 className='display-3 text-center my-3'>
        Product with id {id} does not exist
        </h2>)
        }
        
        </div>
    );
};

export default EditProduct;