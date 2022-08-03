import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNames } from '../../actions/index.js';
import style from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNames(name));
    };

    return (
        <div className={style.container}>
            <input 
                className={style.input}
                type="text" 
                placeholder="Breed name..."
                onChange={e => handleChange(e)}
            />
            <button className={style.button} type="submit" onClick={e => handleSubmit(e)}>Search!</button> 
        </div>
    );
};