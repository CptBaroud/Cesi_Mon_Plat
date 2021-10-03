const express = require('express');
const cors = require('cors')
const router = express.Router();
const { body } = require('express-validator');

const deliveryController = require('../controllers/Delivery')
// Auth middleware
const { isAuthenticated, isRestaurant, isDeliveryMan } = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    deliveryController.get(req, res)
});

router.get('/deliveryMan/:user', [cors(corsOptions), isAuthenticated], function (req, res) {
    deliveryController.getDeliveryMan(req, res)
});

router.get('/user/:user', [cors(corsOptions), isAuthenticated], function (req, res) {
    deliveryController.getUser(req, res)
});

router.get('/restaurant/:restaurant', [cors(corsOptions), isAuthenticated], function (req, res) {
    deliveryController.getRestaurant(req, res)
});



// POST
router.post('/',
    // Fields à valider
    body('deliveryMan').notEmpty().isNumeric(),
    body('client').notEmpty().isNumeric(),
    body('restaurant').notEmpty(),
    body('order').notEmpty(),
    body('address').notEmpty(),
    body('deliveryTime').notEmpty(),
    [cors(corsOptions), isDeliveryMan], function (req, res) {
        deliveryController.add(req, res)
    })

//PUT
router.put('/close/:delivery', [cors(corsOptions), isAuthenticated], function (req, res) {
    deliveryController.close(req, res)
})

router.put('/closeDeliveryMan/:delivery', [cors(corsOptions), isDeliveryMan], function (req, res) {
    deliveryController.closeDeliveryMan(req, res)
})

router.put('/open', [cors(corsOptions), isDeliveryMan], function (req, res) {
    deliveryController.open(req, res)
})

router.put('/taken', [cors(corsOptions), isDeliveryMan], function (req, res) {
    deliveryController.taken(req, res)
})

router.put('/prepare', [cors(corsOptions), isRestaurant], function (req, res) {
    deliveryController.prepare(req, res)
})

//DELETE
router.delete('/:id', [cors(corsOptions), isRestaurant], function (req, res) {
    deliveryController.delete(req, res)
})

module.exports = router;
