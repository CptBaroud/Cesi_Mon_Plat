const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const orderController = require('../controllers/Order')
// Auth middleware
const {isAuthenticated, isClient, isRestaurant, isDeliveryMan} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    orderController.get(req, res)
});

router.get('/one/:order', [cors(corsOptions), isAuthenticated], function (req, res) {
    orderController.getOne(req, res)
});

router.get('/user/:user', [cors(corsOptions), isAuthenticated], function (req, res) {
    orderController.getUserOrder(req, res)
});

router.get('/restaurant/:restaurant', [cors(corsOptions), isAuthenticated], function (req, res) {
    orderController.getRestaurantOrder(req, res)
});

router.get('/status/:status', [cors(corsOptions), isAuthenticated], function (req, res) {
    orderController.getStatus(req, res)
});

// POST
router.post('/',
    // Fields à valider
    body('restaurant').notEmpty().trim(),
    body('address').notEmpty().trim(),
    body('menu').isArray(),
    body('article').isArray(),
    body('price').notEmpty().isNumeric(),
    body('user').notEmpty().isNumeric(),
    [cors(corsOptions), isClient], function (req, res) {
        orderController.add(req, res)
    })

//PUT
router.put('/', [cors(corsOptions), isRestaurant, isClient], function (req, res){
    orderController.edit(req, res)
})

router.put('/accept', [cors(corsOptions), isRestaurant], function (req, res){
    orderController.accept(req, res)
})

router.put('/decline', [cors(corsOptions), isRestaurant], function (req, res){
    orderController.decline(req, res)
})

router.put('/toDelivery', [cors(corsOptions), isDeliveryMan], function (req, res){
    orderController.toDelivery(req, res)
})

router.put('/article/push', [cors(corsOptions), isClient], function (req, res) {
    orderController.pushArticle(req, res)
})

router.put('/article/pull', [cors(corsOptions), isClient, isRestaurant], function (req, res) {
    orderController.pullArticle(req, res)
})

router.put('/menu/push', [cors(corsOptions), isClient], function (req, res) {
    orderController.pushMenu(req, res)
})

router.put('/menu/pull', [cors(corsOptions), isClient, isRestaurant], function (req, res) {
    orderController.pullMenu(req, res)
})

//DELETE
router.delete('/:id', [cors(corsOptions), isRestaurant, isClient], function (req, res) {
    orderController.delete(req, res)
})

module.exports = router;
