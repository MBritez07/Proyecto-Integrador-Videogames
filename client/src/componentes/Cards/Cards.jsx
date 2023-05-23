import React from 'react';
import Card from '../Card/Card';
import style from "./Cards.module.css";

const Cards = ({ characters,onClose }) => {
   return (
     <div className={style.cardscontainer}>
       {characters.map((character) => (
         <Card
           id={character.id}
           key={character.ID}
           name={character.name}
           status={character.status}
           species={character.species}
           gender={character.gender}
           origin={character.origin}
           image={character.image}
           onClose={onClose}           
         />
       ))}
     </div>
   );
 };
 
 export default Cards;