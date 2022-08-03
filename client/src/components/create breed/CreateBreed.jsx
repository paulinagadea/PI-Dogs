import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postBreed, getTemperaments } from '../../actions/index.js';
import style from './CreateBreed.module.css';

// Validations 
function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = 'Name is required!';
    };

    if (!input.life_span) {
        errors.life_span = 'Lifespan is required!';
    };

    if (!input.height) {
        errors.height = 'Height is required!';
    } else if (isNaN(input.height)) {
        errors.height = 'Height must be a number!';
    };

    if (!input.weight) {
        errors.weight = 'Weight is required!';
    } else if (isNaN(input.weight)) {
        errors.weight = 'Weight must be a number!';
    };

    if (input.temperament.length === 0) {
        errors.temperament = 'Temperaments are required!';
    };

    return errors;
};

export default function CreateBreed() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperamentState = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        life_span: '',
        height: '',
        weight: '',
        image: '',
        temperament: [],
    });

    useEffect(() => (
        dispatch(getTemperaments())
    ), [dispatch])

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    function handleSelect(e) {
        e.preventDefault();
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value],
        });
        setErrors(validate({
            ...input,
            temperament: [...input.temperament, e.target.value]
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name || !input.height || !input.weight || !input.life_span || input.temperament.length === 0) {
            alert('Complete all options');
        } else {
            dispatch(postBreed(input));
            alert('Breed created successfully!');
            setInput({
                name: '',
                life_span: '',
                height: '',
                weight: '',
                image: '',
                temperament: [],
            });
            history.push('/home');
        };
    };

    function handleDelete(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== e)
        });
    };

    return (
        <div className={style.div}>
        <div className={style.background}>
            
            <form className={style.container} onSubmit={(e) => {handleSubmit(e)}}>
                <h1 className={style.title}>Create breed!</h1>
                <div className={style.details}>
                    <div className={style.label}>
                    <label className={style.text}>Name: </label>
                    <input 
                        placeholder= {!errors.name? 'Enter a name...' : errors.name}
                        type= 'text'
                        value= {input.name}
                        name= 'name' 
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>

                    <div className={style.label}>
                    <label className={style.text}>Lifespan: </label>
                    <input 
                        placeholder= {!errors.life_span? 'Enter the lifespan...' : errors.life_span}
                        type= 'text'
                        value= {input.life_span}
                        name= 'life_span' 
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>

                    <div className={style.label}>
                    <label className={style.text}>Height: </label>
                    <input 
                        placeholder= {!errors.height? 'Enter the height...' : errors.height}
                        type= 'text'
                        value= {input.height}
                        name= 'height' 
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>

                    <div className={style.label}>
                    <label className={style.text}>Weight: </label>
                    <input 
                        placeholder= {!errors.weight? 'Enter the weight...' : errors.weight}
                        type= 'text'
                        value= {input.weight}
                        name= 'weight'
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>

                    <div className={style.label}>
                    <label className={style.text}>Image: </label>
                    <input 
                        type= 'text'
                        value= {input.image}
                        name= 'image' 
                        onChange={(e) => {handleChange(e)}}
                    />
                    </div>

                    <div className={style.label}>
                    <label className={style.text}>Temperaments: </label>
                    { 
                    <select className={style.option} name="temperament" onChange={(e) => {handleSelect(e)}}>
                        { temperamentState?.map((e) => (
                        <option name="temperament" value={e.name} key={e.id}>{e.name}</option>
                        )) } 
                    </select>
                    }
                    {errors.temperament && (
                        <p className={style.p}>{errors.temperament}</p>
                    )}
                    </div>
                </div>

                <div className={style.box}>
                    <button className={style.button} type='submit'>Create</button>
                    <Link to='/home'><button className={style.button}>Home</button></Link>
                </div>

            </form>

            <div className={style.temperaments}>
                <div className={style.details}>
            { input.temperament.map(e=>
                <div className={style.temp} key={e.id}>
                    <p className={style.names}>{e}</p>
                    <button className={style.buttons} onClick={() => {handleDelete(e)}}>x</button>
                </div>
            )}
                </div>
            </div>

        </div>
        </div>
    );
};