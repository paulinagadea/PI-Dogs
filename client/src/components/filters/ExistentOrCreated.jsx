import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { existentOrCreated, getDogs } from '../../actions/index.js';
import style from '../nav bar/NavBar.module.css';

export default function ExistentOrCreated({setCurrentPage}) {
    const dispatch = useDispatch();

    useEffect(() => (
        dispatch(getDogs())
    ), [dispatch]);

    function handleExistentOrCreated(e) {
        dispatch(existentOrCreated(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className={style.contenedor}>
            <span className={style.option}>Breeds </span>
                <select className= {style.select} onChange={(e) => {handleExistentOrCreated(e)}}>
                    <option></option>
                    <option value='all'>All breeds</option>
                    <option value='api'>Existent</option>
                    <option value='created'>Created</option>
                </select>
        </div>
    );
};