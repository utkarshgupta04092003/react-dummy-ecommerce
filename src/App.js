import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,Routes } from 'react-router-dom';
import Cards from './Cards'
import CardsDetails from './CardsDetails';
import AddProduct from './AddProduct';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import EditProduct from './EditProduct';

function App() {

  return (
    <>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path='/' element={<Cards />} />
      <Route path='/cart/:id' element={<CardsDetails />} />
      <Route path='/add' element={<AddProduct/>} />
      <Route path='/edit/:id' element={<EditProduct />} />
    </Routes>
      
    </>
  );
}

export default App;
