const express = require('express');
const router = express.Router();
const jwtauth = require('../middleware/middleware_auth.js');
const Bookstore = require('../models/bookmodel');
const { body, validationResult } = require('express-validator');

// Get All Books
router.get('/allbooks', jwtauth, async (req, res) => {
    try {
        const allbooks = await Bookstore.find({ user: req.user.id });
        res.json(allbooks)
    } catch (error) {
        console.error(error.message);
        send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addbook', jwtauth, [
    body('title', 'Enter a  title').isLength({min:2}),
    body('author', 'give author name').isLength({ min:2 }),
    body('ISBN', 'give author name').isLength({ min:16 }),
],
 async (req, res) => {
        try {
            const { title, author, ISBN } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return json({ errors: errors.array() });
            }
            // const Bookstore = new Object({
            //     title, author, ISBN, user: req.user.id
            // })
            const savedbook = await Bookstore.create({
                title, author, ISBN, user: req.user.id
            })

            res.json(savedbook)

        } catch (error) {
            console.log(error.message);
            //send("Internal Server Error");
        }
    })
    module.exports = router;