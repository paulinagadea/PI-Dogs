import React from 'react';
import FilterByTemperament from '../filters/FilterByTemperament.jsx';
import ExistentOrCreated from '../filters/ExistentOrCreated.jsx';
import OrderAlph from '../order/OrderAlph.jsx';
import OrderByWeight from '../order/OrderByWeight.jsx';
import style from './NavBar.module.css';

export default function NavBar({setCurrentPage, setOrder}) {
    return (
        <nav className={style.bar}>
            <FilterByTemperament />
            <ExistentOrCreated />
            <OrderAlph setCurrentPage={setCurrentPage} setOrder={setOrder}/>
            <OrderByWeight setCurrentPage={setCurrentPage} setOrder={setOrder}/>
        </nav>
    );
};