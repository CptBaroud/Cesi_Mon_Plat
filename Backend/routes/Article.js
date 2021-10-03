const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const articleController = require('../controllers/Article')
// Auth middleware
const {isAuthenticated, isRestaurant} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

router.get('/restaurant/:restaurant', [cors(corsOptions), isAuthenticated], function (req, res) {
    articleController.getRestaurantArticle(req, res)
});

// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    articleController.get(req, res)
});



// POST
router.post('/',
    // Fields à valider
    body('name').notEmpty().trim(),
    body('description').trim(),
    body('price').notEmpty().isNumeric(),
    body('type').notEmpty(),
    body('category').trim(),
    body('ingredient').isArray(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        articleController.add(req, res)
    })

//PUT
router.put('/', [cors(corsOptions), isRestaurant], function (req, res) {
    articleController.edit(req, res)
})

router.put('/ingredient/push',
    body('ingredient').notEmpty(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        articleController.pushIngredient(req, res)
    })

router.put('/ingredient/pull',
    body('ingredient').notEmpty(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        articleController.pullIngredient(req, res)
    })

//DELETE
router.route('/:id').delete( [cors(corsOptions), isRestaurant], function (req, res) {
    articleController.delete(req, res)
})




module.exports = router;
