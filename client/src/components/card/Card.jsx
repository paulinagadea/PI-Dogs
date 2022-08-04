import React from 'react';
import style from './Card.module.css';

// Transform the first character of every word to uppercase.
function firstChar(name) {
    let splited = name.split(' ');
    let array = [];
    for (const word of splited) {
        array.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return array.join(' ');
};

export default function Card({image, name, temperament, /*min_weight, max_weight*/ weight}) {
    return (
        <div className={style.card}>

            { image ? <img className={style.img} src={image} alt='img not found' width='200px' height='250px' />
            : <img className={style.img} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTm_Te-FSeLLuUtKtSG2aUaBJZTmX1ER_dA&usqp=CAU"} 
              alt='img not found' width='200px' height='250px' /> }

            <div className={style.content}>    
                <h2 className={style.name}>{firstChar(name)}</h2>
                
                { temperament ? <h3 className={style.temperaments}>{temperament}</h3>
                : <h3 className={style.temperaments}>Temperaments not found</h3> }
            
                { weight === null ? <h4 className={style.weight}>Weight not found</h4> 
                : <h4 className={style.weight}>Weight: {weight}kg</h4> }
            </div>

        </div>
    );
};

