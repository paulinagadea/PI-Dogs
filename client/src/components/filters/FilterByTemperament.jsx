import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemperament } from '../../actions/index.js';
import style from '../nav bar/NavBar.module.css';

export default function FilterByTemperament() {
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments);

    function handleFilterByTemperament(e) {
        dispatch(filterByTemperament(e.target.value));
    };

    return (
        <div className={style.contenedor}>
            <span className={style.option}>Temperaments </span>
                <select className={style.select} onChange={(e) => {handleFilterByTemperament(e)}}>
                    <option value='all'>All</option>
                    { allTemperaments?.map((e) => (
                        <option value={e.name} key={e.id}>{e.name}</option>
                    )) } 
                </select>
        </div>
    );
};