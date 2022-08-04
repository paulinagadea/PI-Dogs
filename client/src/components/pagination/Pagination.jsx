import React from 'react';
import style from './Pagination.module.css';

export default function Pagination({dogsPerPage, allDogs, paginado}) {
    // Amount of numbers of the pagination.
    const pageNumbers = [];

    // Calculate the number of pages needed to render all the breeds.
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div>
            { pageNumbers?.map(number => (
                <button className={style.numbers} key={number} onClick={() => paginado(number)}>{number}</button>
            ))}
        </div>
        
    );
};