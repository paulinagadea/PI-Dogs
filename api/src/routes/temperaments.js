const express = require('express');
const { getTemperament } = require('../controllers/controllers.js');
const temperamentsRoutes = express.Router();

// Routes used at "/temperaments".

// Get all the temperaments from my database.
temperamentsRoutes.get('/', async (req, res) => {
    try {
        const temperament = await getTemperament();
        if (temperament) {
            res.status(200).send(temperament);
        } else {
            res.status(404).send('Temperaments not found');
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = temperamentsRoutes;
