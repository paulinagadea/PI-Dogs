import React from 'react';
import { useDispatch } from 'react-redux';
import { orderAlph } from '../../actions/index.js';
import style from '../nav bar/NavBar.module.css';

// Get the setCurrentPage and setOrder from the home component.
export default function OrderAlph({setCurrentPage, setOrder}) {
    const dispatch = useDispatch();
 
    function handleOrderAlph(e) {
        e.preventDefault();
        dispatch(orderAlph(e.target.value));
        setCurrentPage(1);
        // Render the breeds sorted.
        setOrder(e.target.value);
    };

    return (
        <div className={style.contenedor}>
            <span className={style.option}>Alphabetical order </span>
                <select className={style.select} onChange={e => {handleOrderAlph(e)}}>
                    <option value='az'>A to Z</option>
                    <option value='za'>Z to A</option>
                </select>
        </div>
    );
};