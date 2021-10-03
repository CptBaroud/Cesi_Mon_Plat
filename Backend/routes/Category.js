const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const categoryController = require('../controllers/Category')
// Auth middleware
const {isAuthenticated, isRestaurant} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    categoryController.get(req, res)
});

// GET

router.get('/type/:type', [cors(corsOptions), isAuthenticated], function (req, res) {
    categoryController.getCategory(req, res)
});

router.get('/restaurant/:restaurant', [cors(corsOptions), isAuthenticated], function (req, res) {
    categoryController.getRestaurantCategory(req, res)
});



// POST
router.post('/',
    // Fields à valider
    body('name').notEmpty().trim(),
    body('description').notEmpty().trim(),
    body('restaurant').notEmpty().trim(),
    body('type').notEmpty().isNumeric(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        categoryController.add(req, res)
    })

//PUT
router.put('/', [cors(corsOptions), isRestaurant], function (req, res) {
    categoryController.edit(req, res)
})

//DELETE
router.delete('/:id', [cors(corsOptions), isRestaurant], function (req, res) {
    categoryController.delete(req, res)
})

module.exports = router;
