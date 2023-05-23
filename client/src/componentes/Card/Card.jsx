import React from 'react';
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

 //import { useState } from "react";
// import { useEffect } from "react";


const Card=({id,imagen,name,genres,onClose })=>{
   
    return (
      <div className={style.container}>
     
         <img src={imagen} alt='' />
         <NavLink to={`/Detail/${id}`} className={style.link}>
         <h2>{name}</h2>
         </NavLink>
         <h2>Genre: {genres}</h2>
         <button onClick={() => onClose(id)} className={style.closebutton}>X</button>
      </div>
   );
};


export default Card;
