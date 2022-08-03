import React from 'react';
import { useDispatch } from 'react-redux';
import { orderAlph } from '../../actions/index.js';
import style from '../nav bar/NavBar.module.css';

export default function OrderAlph({setCurrentPage, setOrder}) {
    const dispatch = useDispatch();
 
    function handleOrderAlph(e) {
        e.preventDefault();
        dispatch(orderAlph(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value);
    };

    return (
        <div className={style.contenedor}>
            <span className={style.option}>Alphabetical order </span>
            <select className={style.select} onChange={e => {handleOrderAlph(e)}}>
                <option value='asc'>A to Z</option>
                <option value='desc'>Z to A</option>
            </select>
        </div>
    );
};