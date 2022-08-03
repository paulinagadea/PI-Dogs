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
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8);
    const [/*order*/, setOrder] = useState('');
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => (
        dispatch(getDogs())
    ), [dispatch]);

    useEffect(() => (
        dispatch(getTemperaments())
    ), [dispatch]);

    function handleClick(e){
        e.preventDefault();
        setCurrentPage(currentPage);
        dispatch(getDogs());
    };

    const handleClickPrev = (e) => {
        setCurrentPage(currentPage - 1);
    };

    const handleClickNext = (e) => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className={style.background}>

            <div className={style.topbar}>
                <Link className={style.link} to='/'><h1 className={style.title}>Puppies App</h1></Link>
                <button className={style.reload} onClick={e => {handleClick(e)}}>Reload dogs</button>
                <Link to='/create'><button className={style.create}>Create breed!</button></Link>
                <SearchBar />
            </div>

            <div className={style.line}>
                <br></br>
            </div>

            <div>
                <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder}/>
            </div>

            <div className={style.container}> 
                { currentDogs?.map(e => {
                    return (
                        <Link className={style.link} to={`/dogs/${e.id}`} key={e.id}>
                            <Card key={e.id} 
                                image={e.image} 
                                name={e.name} temperament={e.temperament ? e.temperament : e.temperaments?.map(el => el.name + ', ')} 
                                /*min_weight={e.min_weight} max_weight={e.max_weight}*/ 
                                weight={e.weight} />
                        </Link>
                    );
                }) }
            </div>

            <nav>
                <ul className={style.pags}>
                    <button className={style.footerbuttons} onClick={e => {handleClickPrev(e)}}>Prev</button>
                        <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                    <button className={style.footerbuttons} onClick={e => {handleClickNext(e)}}>Next</button>
                </ul>
            </nav>

        </div>
    );
};