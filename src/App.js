
import './App.css';

//function change

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import AddItem from './components/AddItem';
import Generator from './components/Generator';
import Inventory from './components/Inventory';
import SignUp from './components/SignUp';
import Login from './components/Login';
import React, { useEffect } from "react";

function App() {
  

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/additem" element={<AddItem/>}/>
        <Route path="/generator" element={<Generator/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
