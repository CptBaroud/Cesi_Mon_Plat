const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const userController = require('../controllers/User')
// Auth middleware
const {isAuthenticated} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}


// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.get(req, res)
});

router.get('/getUser', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.getUser(req, res)
});

router.get('/getRestaurantUser', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.getRestaurantUser(req, res)
});

router.get('/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.getOne(req, res)
});


// PUT
router.put('/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.edit(req, res)
});

router.put('/profilePicture/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.editAvatar(req, res)
});

router.put('/avatar/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.getOne(req, res)
});

router.put('/block/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.block(req, res)
});

router.put('/unblock/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.unblock(req, res)
});


// POST
router.post('/', cors(corsOptions), function (req, res) {
    userController.create(req, res)
})

router.post('/restaurant', cors(corsOptions), function (req, res) {
    userController.registerRestaurant(req, res)
})

// DELETE
router.delete('/:id',[cors(corsOptions), isAuthenticated], function (req, res) {
    userController.delete(req, res)
})


module.exports = router;
