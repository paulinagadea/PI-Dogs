const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

// Get all the info from the external API and my database.
const getAll = async () => {
    try {
        // Get and save all the info from the external API.
        const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = api.data;

        // Save only the info needed.
        const apiDogs = [];
        for (const dog of apiInfo) {
            apiDogs.push({
                name: dog.name,
                id: dog.id,

                // Split height and weight; if the first element isn't "NaN" I'll transform it into a number and save it.
                // If the first element is "NaN" I'll take the second element, transform it into a number and save it.
                height: dog.height.metric.split(' - ')[0] !== "NaN" ? Number(dog.height.metric.split(' - ')[0])
                : Number(dog.height.metric.split(' - ')[1]),
                weight: dog.weight.metric.split(' - ')[0] !== "NaN" ? Number(dog.weight.metric.split(' - ')[0])
                : Number(dog.weight.metric.split(' - ')[1]),
                life_span: dog.life_span,
                image: dog.image.url,
                temperament: dog.temperament? dog.temperament : 'Temperaments not found',
            });
        };
        
        // Get the breeds from my database including their temperaments.
        const dbDogs = await Dog.findAll({
            include: {
                model: Temperament,
            },
        });

        // If there are created breeds in the database I'll add them to the breeds form the external API.
        // If there's nothing created in the database I'll just return the breeds from the external API.
        if (dbDogs) {
            let allDogs = dbDogs.concat(apiDogs);
            return allDogs;
        } else {
            return apiDogs;
        };
    } catch (error){
        console.error(error);
    };
};

// Get a breed by it's name from the database or the external API.
const getByName = async (name) => {
    try {
        // Get the breeds, filter by the breed's name.
        const allDogs = await getAll();
        console.log(allDogs)
        if (name) {
            const dogName = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            console.log(dogName);
            return dogName;
        };
    } catch (error) {
        console.error(error);
    };
};

// Get a breed by it's id from the database or the external API.
const getById = async (id) => {
    try {
        // Get the breeds, filter by the breed's id.
        const dogs = await getAll();
        if (id) {
            const dogId = dogs.filter(d => d.id == id);
            return dogId;
        };
    } catch (error) {
        console.error(error);
    };
};

// Get the results from the form and create a new breed.
const createDog = async (name, life_span, height, weight, image, temperament) => {
    try {
        // Create and save the new breed.
        const dogCreated = await Dog.create({
            name: name.toLowerCase(),
            id: uuidv4(),
            life_span,
            height,
            weight,
            image,
        });
        
        await getTemperament();

        // Search the temperaments in the database and add them to the new breed.
        const temperamentDb = await Temperament.findAll({
            where: {
                name: temperament,
            }
        });
        dogCreated.addTemperament(temperamentDb);
        return dogCreated;
    } catch (error) {
        console.error(error);
    };
};

// Get all the temperaments from the external API and save them in the database.
const getTemperament = async () => {
    try {
        const api = await getAll();
        
        // Save the temperaments, join the elements in a string and separate them every ",".
        // Remove whitespaces and sort alphabetically.
        const apiTemperament = api.map(e => e.temperament);
        let temperament = apiTemperament.join().split(',');
        temperament = temperament.map(t => t.trim()).sort();

        // Save everything in a set to avoid duplicated temperaments, create a temperament in the database for every element.
        const set = new Set(temperament);
        set.forEach(e => {
            if (e.length > 0) {
                Temperament.findOrCreate({
                    where: {
                        name: e,
                    }
                });
            };
        });

        // Return the temperaments.
        const temperamentDb = await Temperament.findAll();
        return temperamentDb;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    getAll,
    getByName,
    getById,
    createDog,
    getTemperament,
};