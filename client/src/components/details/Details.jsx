import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetails } from '../../actions/index.js';
import style from './Details.module.css';

export default function Details() {
    const dispatch = useDispatch();

    // Use the id recieved from "Route path='/dogs/:id'".
    const { id } = useParams();
    const dog = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    // Transform the first character of every word to uppercase.
    function firstChar(name) {
        let splited = name.split(' ');
        let array = [];
        for (const word of splited) {
            array.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
        return array.join(' ');
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

            {/* Check if there's something saved in the state details. */}
            { dog.length > 0 ? 

                <div className={style.card}>

                    <div>

                        { dog[0].image ? <img className={style.img} src={dog[0].image} alt='img not found' width='200px' height='250px' />
                          : <img className={style.img} 
                             src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTm_Te-FSeLLuUtKtSG2aUaBJZTmX1ER_dA&usqp=CAU"} 
                             alt='img not found' width='200px' height='250px' /> }

                        <h1 className={style.name}>{firstChar(dog[0].name)}</h1>
                        <p className={style.temperaments}>
                            Temperaments: { dog[0].temperament? dog[0].temperament : joinTemps(dog[0].temperaments) }
                        </p>
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