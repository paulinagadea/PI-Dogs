import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments } from '../../actions/index.js';
import { Link } from 'react-router-dom';
import Card from '../card/Card.jsx';
import Pagination from '../pagination/Pagination.jsx';
import NavBar from '../nav bar/NavBar.jsx';
import SearchBar from '../search bar/SearchBar.jsx';
import style from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

    // Set the current page in 1 and render 8 breeds per page.
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8);

    // State used at the order components.
    const [/*order*/, setOrder] = useState('');

    // Save the index of the last and first breeds.
    const indexOfLastDog = currentPage * dogsPerPage;  // Example: 1 * 8 = 8 --> 2 * 8 = 16
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;  // Example: 8 - 8 = 0 --> 16 - 8 = 8

    // Save the breeds rended per page, 'cut' the global state by the index of the first and last breeds.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); 

    // Get the number at the pagination component and set the current page.
    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    };

    useEffect(() => (
        dispatch(getDogs())
    ), [dispatch]);

    useEffect(() => (
        dispatch(getTemperaments())
    ), [dispatch]);

    // Reload the breeds; set the current page to the first page and render the breeds.
    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getDogs());
    };

    // Used by the prev and next buttons.
    function handleClickPrev() {
        setCurrentPage(currentPage - 1);
    };

    function handleClickNext() {
        setCurrentPage(currentPage + 1);
    };

    // Get the temperaments and join the names.
    function joinTemps(temperaments) {
        let temps = [];
        for (const temp of temperaments) {
            temps.push(temp.name);
        };
        return temps.join(', ');
    };

    return (
        <div className={style.background}>

            <div className={style.topbar}>
                <Link className={style.link} to='/'><h1 className={style.title}>Puppies App</h1></Link>

                <button className={style.reload} onClick={e => {handleClick(e)}}>Reload dogs</button>
                
                <Link to='/create'>
                    <button className={style.create}>Create breed!</button>
                </Link>

                <SearchBar />
            </div>

            <div className={style.line}>
                <br></br>
            </div>

            <div>
                <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder}/>
            </div>

            <div className={style.container}> 
                {/* Render the breeds of the current page. */}
                { currentDogs?.map(e => {
                    return (
                        <Link className={style.link} to={`/dogs/${e.id}`} key={e.id}>
                            <Card key={e.id} 
                                image={e.image} 
                                name={e.name} 
                                temperament={ e.temperaments ? joinTemps(e.temperaments) : e.temperament }  
                                weight={e.weight} />
                        </Link>
                    );
                  }) }
            </div>

            <nav>
                <ul className={style.pags}>
                    <button className={style.footerbuttons} onClick={e => {handleClickPrev(e)}}>Prev</button>
                        <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} currentPage={currentPage}/>
                    <button className={style.footerbuttons} onClick={e => {handleClickNext(e)}}>Next</button>
                </ul>
            </nav>

        </div>
    );
};