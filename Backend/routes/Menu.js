const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const menuController = require('../controllers/Menu')
// Auth middleware
const {isAuthenticated, isRestaurant} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/restaurant/:restaurant', [cors(corsOptions), isAuthenticated], function (req, res) {
    menuController.getRestaurantMenu(req, res)
});

router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    menuController.get(req, res)
});


// POST
router.post('/',
    // Fields à valider
    body('name').notEmpty().trim(),
    body('description').trim(),
    body('price').notEmpty().isNumeric(),
    body('category').trim(),
    body('article').notEmpty().isArray(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        menuController.add(req, res)
    })

//PUT
router.put('/', [cors(corsOptions), isRestaurant], function (req, res) {
    menuController.edit(req, res)
})

router.put('/article/push',
    body('article').notEmpty(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        menuController.pushArticle(req, res)
    })

router.put('/article/pull',
    body('article').notEmpty(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        menuController.pullArticle(req, res)
    })

//DELETE
router.delete('/:id', [cors(corsOptions), isRestaurant], function (req, res) {
    menuController.delete(req, res)
})

module.exports = router;
