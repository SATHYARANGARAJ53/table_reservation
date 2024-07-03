import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import UserList from './components/UserList'
import axios from 'axios'


function App() {

  const [reserve,setreserve] =useState(null);
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response =await axios.get("http://localhost:3000/api")
        setreserve(response.data)
      }
      catch(error){
        console.error(error)
      }
     
    }
    fetchdata()
  },[])
  console.log(reserve);

  return (
    <>
    
    
    <Header/>
    <UserList reserve={reserve} setreserve={setreserve}/>
   
      
    </>
  )
}

export default App
