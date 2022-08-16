import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    try {
      const allDogs = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: "GET_DOGS",
        payload: allDogs.data,
      });
    } catch (error) {
      console.error(error);
    };
  };
};

export function getNames(payload) {
  return async function (dispatch) {
    try {
      const name = await axios.get("http://localhost:3001/dogs?name=" + payload);
      return dispatch({
        type: "GET_NAMES",
        payload: name.data,
      });
    } catch {
      alert('Breed not found');
    };
  };
};

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const allTemperaments = await axios.get("http://localhost:3001/temperaments");
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: allTemperaments.data,
      });
    } catch (error) {
      console.error(error);
    };
  };
};

export function postBreed(payload) {
  return async function () {
    try {
      const breed = await axios.post("http://localhost:3001/dogs", payload);
      return breed;
    } catch (error) {
      console.error(error);
    };
  };
};

export function filterByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
};

export function existentOrCreated(payload) {
  return {
    type: "EXISTENT_OR_CREATED",
    payload,
  };
};

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
};

export function orderAlph(payload) {
  return {
    type: "ORDER_ALPH",
    payload,
  };
};

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    };
  };
}

export function detailEmpty() {
    return {
        type: 'DETAIL_EMPTY'
    };
};
