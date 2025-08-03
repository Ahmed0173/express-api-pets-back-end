// controllers/pets.js
const { model } = require('mongoose');
const Pet = require('../models/pet.js');
const express = require('express');
const e = require('express');
const router = express.Router();

// Get routes (Test)
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.json(foundPets);
    } catch (error) {
        const message = { msg: error.message };
        res.status.json(message);
    }
});

router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body);
        res.json(createdPet);
    } catch (error) {
        const massage = {msg: error.message}
        res.status.json(massage);
    }
});

module.exports = router;
