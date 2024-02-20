'use client'
import React, { useState } from 'react';
import classes from './page.module.css'
import { useSocket } from '../context/SocketProvider';

export default function page (){
const {sendMessage, messages} = useSocket();
const[message,setMessage] = useState("");


  return (
    <div>
      
      <input
      onChange={(e)=> setMessage(e.target.value)} className = { classes["chat-input"]}type="text" placeholder = "Message"/>
      <button
      onClick={(e)=> sendMessage(message)} className = { classes["button"]}> send </button>
      

      <div>
        
       {messages.map(e=> <li>{e}</li>)}

      </div>
    </div>
    
  )
}