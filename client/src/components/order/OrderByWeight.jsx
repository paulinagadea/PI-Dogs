import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByWeight } from '../../actions/index.js';
import style from '../nav bar/NavBar.module.css';

// Get the setCurrentPage and setOrder from the home component.
export default function OrderByWeight({setCurrentPage, setOrder}) {
    const dispatch = useDispatch();

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    };
    
    return (
        <div className={style.contenedor}>
            <span className={style.option}>Order by weight </span>
            <select className={style.select} onChange={e => handleOrderByWeight(e)}>
                <option></option>
                <option value='asc'>Lighter to heavier</option>
                <option value='desc'>Heavier to lighter</option>
            </select>
        </div>
    );
};