const express = require('express');
const { getAll, getByName, getById, createDog } = require('../controllers/controllers.js');
const dogsRoutes = express.Router();

// Routes used at "/dogs".

// Get the breeds that matches the query.
dogsRoutes.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        // If there isn't a query I'll just return all the breeds.
        if (!name) {
            const allDogs = await getAll();
            res.status(200).send(allDogs);
        } else {
            const dog = await getByName(name);
            if (dog.length) {
                res.status(200).send(dog);
            } else {
                res.status(404).send("Dog not found");
            };
        };
    } catch (error) {
        res.send(error);
    };
});

// dogsRoutes.get('/', async (req, res) => {
//     const { name } = req.query;

//         if (!name) {
//             getAll()
//             .then(result => res.status(200).send(result))
//             // res.status(200).send(allDogs);
//         } else {
//             getByName(name)
//             .then(result => {if (result) {
//                 res.status(200).send(result);
//             } else {
//                 res.status(404).send("Dog not found" );
//             }})
//         };
    
// });

// Get the breed that matches the id.
dogsRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let result = await getById(id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('Dog not found');
        };
    } catch (error) {
        res.send(error);
    };
});

// Get the results of the form and create a new breed.
dogsRoutes.post('/', async (req, res) => {
    const { name, life_span, height, weight, image, temperament } = req.body;
    try {
        const newDog = await createDog(name, life_span, height, weight, image, temperament);
        if (newDog) {
            res.status(200).send(newDog);
        } else {
            res.status(404).send('Could not create a new dog');
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = dogsRoutes;
