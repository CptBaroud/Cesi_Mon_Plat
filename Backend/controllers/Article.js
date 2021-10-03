const article = require('../models/Article')
const restaurant = require('../models/Restaurant')
const menu = require('../models/Menu')

const send = require("../utils/send.utils");
const validator = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let articleController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        article
            .find()
            .populate('category')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getRestaurantArticle(req, res) {
        article
            .find({restaurant: req.params.restaurant})
            .populate('category')
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

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send.sendError(res, 500, {errors: errors.array()})
        }

        const newArticle = new article({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            ingredient: req.body.ingredient,
            category: req.body.category ? req.body.category : null,
            restaurant: req.body.restaurant
        })

        try {
            save = await newArticle.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            await restaurant
                .findByIdAndUpdate({_id: save.restaurant},
                    {$push: {article: save._id}},
                    {new: true, useFindAndModify: false})
                .exec()

            article
                .populate(newArticle, {path: 'category '})
                .then(doc => {
                    // On informe tout les clients qu'il y a eu un nv contact
                    req.app.httpsIo.emit('article', {update: true})
                    if (process.env.DEV) {
                        req.app.httpIo.emit('article', {update: true})
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
            article
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: req.body},
                    {new: true, useFindAndModify: false})
                .populate('category ')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('article', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('article', {update: true})
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

    pushIngredient(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            article
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {ingredient: req.body.ingredient}},
                    {new: true, useFindAndModify: false})
                .populate('category ')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('article', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('article', {update: true})
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

    pullIngredient(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            article
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {ingredient: req.body.ingredient}},
                    {new: true, useFindAndModify: false})
                .populate('category ')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('article', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('article', {update: true})
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
        console.log(req.params.id)
        const id = req.params.id
        if (validator.isValidObjectId(id)) {
            menu
                .findOneAndUpdate({article: id},
                {$pull: {article: id}},
                {new: true, useFindAndModify: false})
                .exec(function (err, doc) {
                    if (!err) {
                        article
                            .findByIdAndDelete({_id: id})
                            .exec(function (err, doc) {
                                if (!err) {
                                    // On informe tout les clients qu'il y a eu un nv contact
                                    req.app.httpsIo.emit('article', {update: true})
                                    req.app.httpsIo.emit('menu', {update: true})
                                    if (process.env.DEV) {
                                        req.app.httpIo.emit('article', {update: true})
                                        req.app.httpIo.emit('menu', {update: true})
                                    }
                                    send.sendData(res, doc)
                                } else {
                                    send.sendError(res, 500, doc)
                                }
                            })
                    } else {
                        send.sendError(res, 500, doc)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id invalid'})
        }
    }
}

module.exports = articleController
