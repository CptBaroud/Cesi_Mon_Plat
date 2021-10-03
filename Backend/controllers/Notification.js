const notification = require('../models/Notifications')
const send = require("../utils/send.utils");
const validator = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let pageController = {
    /**
     * Récupération des notifications dans la bdd
     * @param req
     * @param res
     */
    getUserNotifications(req, res) {
        notification
            .find({user: {$eq: req.params.user}})
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    /**
     * Création d'une notification
     * @param req
     * @param res
     */
    async create(req, res) {
        let save

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send.sendError(res, 500, {errors: errors.array()})
        }

        const new_notification = new notification({
            info: {
                type: req.body.type,
                icon: req.body.icon
            },
            seen: false,
            read: false,
            user: req.body.user,
            title: req.body.title,
            to: req.body.to ? req.body.to : ''
        })

        try {
            save = await new_notification.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            // On informe tout les clients qu'il y a eu un nv contact
            req.app.httpsIo.emit('notification', {update: true, user: req.body.user, data: save})
            if (process.env.DEV) {
                req.app.httpIo.emit('notification', {update: true, user: req.body.user, data: save})
            }
            return send.sendData(res, save)
        }
    },

    /**
     * Lorsque l'user "voit" la notification
     * @param req
     * @param res
     */
    seen(req, res) {
        if(validator.isValidObjectId(req.body._id)) {
            notification
                .findByIdAndUpdate(
                    {_id: req.body._id},
                    {$set: {seen: true}},
                    {new: true, useFindAndModify: false})
                .exec(function (err, doc) {
                    if (!err) {
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id is invalid'})
        }
    },

    /**
     * Marque une notification comme lue
     * @param req
     * @param res
     */
    read(req, res) {
        if(validator.isValidObjectId(req.body._id)) {
            notification
                .findByIdAndUpdate(
                    {_id: req.body._id},
                    {$set: {read: true}},
                    {new: true, useFindAndModify: false})
                .exec(function (err, doc) {
                    if (!err) {
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id is invalid'})
        }
    },

    /**
     * Delete une notification
     * @param req
     * @param res
     */
    delete(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            notification
                .findByIdAndDelete({_id: req.params.id})
                .exec(function (err, response) {
                    if (!err) {
                        send.sendData(res, response)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id is invalid'})
        }
    }
}

module.exports = pageController
