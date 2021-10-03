const menu = require('../models/Menu')
const restaurant = require('../models/Menu')
const send = require("../utils/send.utils");
const validator = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let menuController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        menu
            .find()
            .populate('article category')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getRestaurantMenu(req, res) {
        menu
            .find({restaurant: req.params.restaurant})
            .populate('article category')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    /**
     * @param req
     * @param res
     */
    async add(req, res) {
        let save
        const newMenu = new menu({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category ? req.body.category : null,
            restaurant: req.body.restaurant,
            article: req.body.article
        })

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send.sendError(res, 500, {errors: errors.array()})
        }

        try {
            save = await newMenu.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            await restaurant
                .findByIdAndUpdate({_id: save.restaurant},
                    {$push: {article: save._id}},
                    {new: true, useFindAndModify: false})
                .exec()

            menu
                .populate(newMenu, {path: 'article category'})
                .then(doc => {
                    // On informe tout les clients qu'il y a eu un nv contact
                    req.app.httpsIo.emit('menu', {update: true})
                    if (process.env.DEV) {
                        req.app.httpIo.emit('menu', {update: true})
                    }
                    send.sendData(res, doc)
                })
                .catch(err => {
                    send.sendError(res, 500, err)
                })
        }
    },

    /**
     *
     * @param req
     * @param res
     */
    edit(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            menu
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: req.body},
                    {new: true, useFindAndModify: false})
                .populate('article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('menu', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('menu', {update: true})
                        }
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id invalid'})
        }
    },

    pushArticle(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            menu
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {article: req.body.article}},
                    {new: true, useFindAndModify: false})
                .populate('article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('menu', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('menu', {update: true})
                        }
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id invalid'})
        }
    },

    pullArticle(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            menu
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {article: req.body.article}},
                    {new: true, useFindAndModify: false})
                .populate('article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('menu', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('menu', {update: true})
                        }
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id invalid'})
        }
    },

    /**
     *
     * @param req
     * @param res
     */
    delete(req, res) {
        if (validator.isValidObjectId(req.params.id)) {
            menu
                .findByIdAndDelete({_id: req.params.id})
                .exec(function (err, doc) {
                    if (!err) {
                        send.sendData(res, {message: 'Menu deleted succesfully'})
                    } else {
                        send.sendError(res, 500, doc)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id invalid'})
        }
    }
}

module.exports = menuController
