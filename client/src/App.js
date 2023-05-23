
import {Routes, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './componentes/HOME/Home'; 
import LandingPage from './componentes/LANDING_PAGE/LandingPage';


// import { useEffect } from "react";

//import {Routes } from 'react-router-dom'; //necesario para usar el route
// // import BotBasico from './componentes/BotBasico/BotBasico';

//useState para mantener el estado de currentTime, que representa la hora actual
//useEffect para ejecutar el código que actualiza la hora cada segundo y lo asigna al estado currentTime
function App() {
      return (
   <div className='App'>
     <Routes>
      <Route path = "/" element={<LandingPage/>}/>
      <Route path='/home' element={ <Home/>} />
      {/* <Route path='/Detail/:id' element ={<Detail/>}/> */}
      
      </Routes>
   </div>
  );
}


 export default App