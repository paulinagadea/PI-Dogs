import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postBreed, getTemperaments } from "../../actions/index.js";
import style from "./CreateBreed.module.css";

// Validations
function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required!";
  } else if (input.name.length < 3 || /[0-9.+]/.test(input.name)) {
    errors.name = "Invalid name";
  };

  if (!input.life_span) {
    errors.life_span = "Lifespan is required!";
  };

  if (!input.height) {
    errors.height = "Height is required!";
  } else if (!/^[0-9]\d*(.\d+)?$/.test(input.height)) {
    errors.height = "Height must be an integer number!";
  } else if (input.height < 1) {
    errors.height = "Height can not be less than 1!";
  } else if (input.height > 99) {
    errors.height = "Height can not be greater than 99!";
  };

  if (!input.weight) {
    errors.weight = "Weight is required!";
  } else if (!/^[0-9]\d*(.\d+)?$/.test(input.weight)) {
    errors.weight = "Weight must be an integer number"; 
  } else if (input.weight < 1) {
    errors.weight = "Weight can not be less than 1!";
  } else if (input.weight > 99) {
    errors.weight = "Weight can not be greater than 99!";
  };

  if (input.temperament.length === 0) {
    errors.temperament = "Temperaments are required!";
  };

  return errors;
};

export default function CreateBreed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperamentState = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    life_span: "",
    height: "",
    weight: "",
    image: "",
    temperament: [],
  });

  // Show the temperaments so the user can select them.
  useEffect(() => (
    dispatch(getTemperaments())
  ), [dispatch]);

  // Get the changes at the inputs and set the local states.
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  // Get the changes at the select (temperaments) and set the temperament of the local states.
  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        temperament: [...input.temperament, e.target.value],
      })
    );
  }

  // Get the changes at the form, if there's something missing at the inputs the client will recieve an alert.
  // If all the information is complete the new breed will be created through the action postBreed.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("Please, check the required information!");
    } else {
      dispatch(postBreed(input));
      alert("Breed created successfully!");
      setInput({
        name: "",
        life_span: "",
        height: "",
        weight: "",
        image: "",
        temperament: [],
      });
      history.push("/home");
    }
  };

  // Delete the temperaments the client chooses.
  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== e),
    });
  }

  return (
    <div className={style.div}>

      <div className={style.background}>

        <form className={style.container} onSubmit={(e) => {handleSubmit(e)}}>

          <h1 className={style.title}>Create breed!</h1>

          <div className={style.details}>

            <div className={style.label}>

              <label className={style.text}>Name: </label>
              <input
                placeholder="Enter a name..."
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => {handleChange(e)}}
              />
              {errors.name && <p className={style.p}>{errors.name}</p>}
            </div>

            <div className={style.label}>
              <label className={style.text}>Lifespan: </label>
              <input
                placeholder="Enter the lifespan..."
                type="text"
                value={input.life_span}
                name="life_span"
                onChange={(e) => {handleChange(e)}}
              />
              {errors.life_span && <p className={style.p}>{errors.life_span}</p>}
            </div>

            <div className={style.label}>
              <label className={style.text}>Height: </label>
              <input
                placeholder="Enter the height..."
                type="text"
                value={input.height}
                name="height"
                onChange={(e) => {handleChange(e)}}
              />
              {errors.height && <p className={style.p}>{errors.height}</p>}
            </div>

            <div className={style.label}>
              <label className={style.text}>Weight: </label>
              <input
                placeholder="Enter the weight..."
                type="text"
                value={input.weight}
                name="weight"
                onChange={(e) => {handleChange(e)}}
              />
              {errors.weight && <p className={style.p}>{errors.weight}</p>}
            </div>

            <div className={style.label}>
              <label className={style.text}>Image: </label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => {handleChange(e)}}
              />
            </div>

            <div className={style.label}>
              <label className={style.text}>Temperaments: </label>
              { <select className={style.option}
                  name="temperament"
                  onChange={(e) => {handleSelect(e)}}
                >
                  {temperamentState?.map((e) => (
                    <option name="temperament" value={e.name} key={e.id}>{e.name}</option>
                  ))}
                </select>
              }

              {errors.temperament && (
                <p className={style.p}>{errors.temperament}</p>
              )}
            </div>

          </div>

          <div className={style.box}>
            <button className={style.button} type="submit">Create</button>
            <Link to="/home">
              <button className={style.button}>Home</button>
            </Link>
          </div>

        </form>

        <div className={style.temperaments}>
          <div className={style.details}>
            { input.temperament.map((e) => (
              <div className={style.temp} key={e.id}>
                <p className={style.names}>{e}</p>
                <button className={style.buttons} key={e.id} onClick={() => {handleDelete(e)}}>x</button>
              </div>
            ))  }
          </div>
        </div>

      </div>

    </div>
  );
};
