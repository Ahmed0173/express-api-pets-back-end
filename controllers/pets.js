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
        res.status(500).json(message);
    }
});

// Create a new pet
router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body);
        res.json(createdPet);
    } catch (error) {
        const message = { msg: error.message };
        res.status(500).json(message);
    }
});


// show one pet
router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId);
        // If the pet is not found
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found');
        }
        // If the pet is found
        res.status(200).json(foundPet);
    } catch (error) {
        const message = { msg: error.message };
        // If the error is a 404, we send that status
        if (res.statusCode === 404) {
            res.json({ message: 'Pet not found' });
        } else {
            res.status(500).json(message);
        }
    }
});

// delete a pet
router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
        // If the pet is not found
        if (!deletedPet) {
            res.status(404);
            throw new Error('Pet not found');
        }
        // If the pet is found and deleted
        res.status(200).json({ msg: 'Pet deleted successfully' });
    } catch (error) {
        const message = { msg: error.message };
        res.status(500).json(message);
    }
});


// Update a pet
router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });
        // If the pet is not found
        if (!updatedPet) {
            res.status(404);
            throw new Error('Pet not found');
        }
        // If the pet is found and updated
        res.status(200).json(updatedPet);
    } catch (error) {
        const message = { msg: error.message };
        // If the error is a 404, we send that status
        if (res.statusCode === 404) {
            res.json({ message: 'Pet not found' });
        } else {
            res.status(500).json(message);
        }
    }
});

module.exports = router;
