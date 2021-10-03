const restaurant = require('../models/Restaurant')
const send = require("../utils/send.utils");
const helper = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let restaurantController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        restaurant
            .find()
            .populate('menu article category')
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
        let logoUrl

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send.sendError(res, 500, {errors: errors.array()})
        }

        if (req.body.logo) {
            logoUrl = await helper.uploadFile(req.body.logo)
        }

        const newRestaurant = new restaurant({
            user: req.body.user,
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            menu: req.body.menu,
            categories: req.body.categories,
            article: req.body.article
        })

        try {
            save = await newRestaurant.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            restaurant
                .findByIdAndUpdate({_id: save._id},
                    {$set: {logo: logoUrl}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
                        }
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, err)
                    }
                })
        }
    },

    /**
     *
     * @param req
     * @param res
     */
    edit(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: req.body},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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

    async updateLogo(req, res) {
        const rest = await restaurant.find({_id: req.body._id})

        if (rest.logo) {
            await helper.deleteFile(rest)
        }
        req.body.linkedTo = req.body.restaurant
        const logo = await helper.uploadFile(req.body)

        restaurant
            .findByIdAndUpdate({_id: req.body.restaurant},
                {$set: {logo}},
                {new: true, useFindAndModify: false})
            .populate('menu article category')
            .exec(function (err, doc) {
                if (!err) {
                    // On informe tout les clients qu'il y a eu un nv contact
                    req.app.httpsIo.emit('restaurant', {update: true})
                    if (process.env.DEV) {
                        req.app.httpIo.emit('restaurant', {update: true})
                    }
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    pushMenu(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {menu: req.body.menu}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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

    pullMenu(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {menu: req.body.menu}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {article: req.body.article}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {article: req.body.article}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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

    pushCategory(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {category: req.body.category}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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

    pullCategory(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            restaurant
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {category: req.body.category}},
                    {new: true, useFindAndModify: false})
                .populate('menu article category')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
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
        const id = req.params.id
        if (helper.isValidObjectId(id)) {
            restaurant
                .findByIdAndDelete({_id: id})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('restaurant', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('restaurant', {update: true})
                        }
                        send.sendData(res, doc)
                    } else {
                        send.sendError(res, 500, doc)
                    }
                })
        } else {
            send.sendError(res, 500, {message: 'Id invalid'})
        }
    }
}

module.exports = restaurantController
