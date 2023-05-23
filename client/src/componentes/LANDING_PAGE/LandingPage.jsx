import React from 'react';
import style from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';

function LandingPage() {
  return (
    <div className={style.fondo}>
      <h1 className='title'>ENCUENTRA TODO SOBRE TUS JUEGOS FAVORITOS</h1>
      <NavLink to="/home" className='link'>
        Ingresar
      </NavLink>
    </div>
  );
}

export default LandingPage;
