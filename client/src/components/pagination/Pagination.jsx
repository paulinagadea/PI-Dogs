import React from 'react';
import style from './Pagination.module.css';

export default function Pagination({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <>
            { pageNumbers?.map(number => (
                <button className={style.numbers} key={number} onClick={() => paginado(number)}>{number}</button>
            ))}
        </>
        
    );
};