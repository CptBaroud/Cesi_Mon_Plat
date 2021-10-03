const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const notificationController = require('../controllers/Notification')
// Auth middleware
const {isAuthenticated} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// GET
router.get('/:user', [cors(corsOptions), isAuthenticated], function (req, res) {
    notificationController.getUserNotifications(req, res)
});

// POST
router.post('/',
    // Fields à valider
    body('title').notEmpty().trim(),
    body('to').trim(),
    body('user').notEmpty().isNumeric(),
    [cors(corsOptions), isAuthenticated], function (req, res) {
        notificationController.create(req, res)
    })

//PUT
router.put('/seen', [cors(corsOptions), isAuthenticated], function (req, res) {
    notificationController.seen(req, res)
})

router.put('/read', [cors(corsOptions), isAuthenticated], function (req, res) {
    notificationController.read(req, res)
})

//DELETE
router.delete('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    notificationController.delete(req, res)
})

module.exports = router;
