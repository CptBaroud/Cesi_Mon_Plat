const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const restaurantController = require('../controllers/Restaurant')
// Auth middleware
const {isAuthenticated, isRestaurant} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    restaurantController.get(req, res)
});

// POST
router.post('/',
    // Fields à valider
    body('user').notEmpty().trim(),
    body('description').notEmpty().trim(),
    body('name').notEmpty().trim(),
    body('menu').isArray(),
    body('article').isArray(),
    body('category').isArray(),
    body('user').notEmpty().isNumeric(),
    [cors(corsOptions), isRestaurant], function (req, res) {
        restaurantController.add(req, res)
    })

//PUT
router.put('/', [cors(corsOptions), isRestaurant], function (req, res){
    restaurantController.edit(req, res)
})

router.put('/logo', [cors(corsOptions), isRestaurant], function (req, res){
    restaurantController.updateLogo(req, res)
})

router.put('/article/push', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.pushArticle(req, res)
})

router.put('/article/pull', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.pullArticle(req, res)
})

router.put('/menu/push', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.pushMenu(req, res)
})

router.put('/menu/pull', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.pullMenu(req, res)
})

router.put('/category/push', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.pushCategory(req, res)
})

router.put('/category/pull', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.pullCategory(req, res)
})

//DELETE
router.delete('/', [cors(corsOptions), isRestaurant], function (req, res) {
    restaurantController.delete(req, res)
})

module.exports = router;
