// Importing necessary modules
// Express is used to create the router and handle HTTP requests and responses
const express = require('express');

// Initializing the router from Express
const router = express.Router();

// Importing the UserService class which contains methods for user registration and authentication
const UserService = require('../services/UserService');

// Creating an instance of the UserService class to use its methods
const userService = new UserService();

/**
 * POST route for registering a new user.
 * Endpoint: /register
 * 
 * @param {Object} req - The request object containing user data (name, email, password, etc.)
 * @param {Object} res - The response object used to send back data or errors to the client
 */
router.post('/register', async (req, res) => {
    try {
        // Extracting user data from the request body
        const userData = req.body;

        // Calling the register method from userService to register the user
        const result = await userService.register(userData);

        // If registration is successful, send a 201 (Created) status with the result
        res.status(201).json(result);
    } catch (error) {
        // If there's an error (e.g., user already exists), send a 400 (Bad Request) status with the error message
        res.status(400).json({ message: error.message });
    }
});

/**
 * POST route for authenticating and logging in a user.
 * Endpoint: /login
 * 
 * @param {Object} req - The request object containing user credentials (email and password)
 * @param {Object} res - The response object used to send back data or errors to the client
 */
router.post('/login', async (req, res) => {
    try {
        // Extracting user credentials from the request body
        const credentials = req.body;

        // Calling the login method from userService to authenticate the user
        const result = await userService.login(credentials);

        // If authentication is successful, send a 200 (OK) status with the result (e.g., JWT)
        res.status(200).json(result);
    } catch (error) {
        // If there's an error (e.g., invalid credentials), send a 400 (Bad Request) status with the error message
        res.status(400).json({ message: error.message });
    }
});

// Exporting the router to be used in other parts of the application
module.exports = router;