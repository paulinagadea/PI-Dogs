import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetails } from '../../actions/index.js';
import style from './Details.module.css';

export default function Details() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const dog = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    return (
        <div className={style.background}>
            { dog.length > 0 ? 

                <div className={style.card}>

                    <div>

                    <img className={style.img} src={dog[0].image} alt='img not found'/>
                    <h1 className={style.name}>{dog[0].name}</h1>
                    <p className={style.temperaments}>Temperaments: {dog[0].temperament? dog[0].temperament : dog[0].temperaments.map(el => el.name + ', ')}</p>
                    <p className={style.life}>Lifespan: {dog[0].life_span}</p>

                    <div className={style.info}>
                    { dog[0].weight !== 'Weight not found' ? <p className={style.text}>Weight: {dog[0].weight}kg</p>
                    : <p className={style.text}>{dog[0].weight}kg</p>
                    }

                    { dog[0].height !== 'Height not found' ? <p className={style.text}>Height: {dog[0].height}cm</p>
                    : <p className={style.text}>{dog[0].height}cm</p>
                    }
                    </div>

                    </div>

                </div>

                // ACA IRÍA UN LOADER
            : <p>Loading...</p>
            }

            <Link to='/home'>
                <button className={style.button}>Go back!</button>
            </Link>

        </div>
    );
};