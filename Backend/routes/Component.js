const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const componentController = require('../controllers/Component')
// Auth middleware
const {isAuthenticated, isRestaurant} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    componentController.get(req, res)
});

// POST
router.post('/',
    // Fields à valider
    body('name').notEmpty().trim(),
    body('link').notEmpty().trim(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        componentController.add(req, res)
    })

//PUT
router.put('/', [cors(corsOptions), isRestaurant], function (req, res) {
    componentController.edit(req, res)
})

//DELETE
router.delete('/:id', [cors(corsOptions), isRestaurant], function (req, res) {
    componentController.delete(req, res)
})

module.exports = router;
