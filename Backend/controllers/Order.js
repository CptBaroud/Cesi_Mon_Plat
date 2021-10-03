const order = require('../models/Order')
const send = require("../utils/send.utils");
const helper = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let orderController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        order
            .find()
            .populate('article menu')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getOne(req, res) {
        order
            .findOne({_id: req.params.order})
            .populate('article menu')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getStatus(req, res) {
        order
            .find({status: req.params.status})
            .populate('article menu')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getRestaurantOrder(req, res) {
        order
            .find({restaurant: req.params.restaurant})
            .populate('article menu')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getUserOrder(req, res) {
        order
            .find({user: req.params.user})
            .populate('article menu')
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

        const newOrder = new order({
            user: req.body.user,
            restaurant: req.body.restaurant,
            address: req.body.address,
            accepted: false,
            price: req.body.price,
            menu: req.body.menu,
            article: req.body.article
        })

        try {
            save = await newOrder.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            order
                .populate(newOrder, {path: 'article menu'})
                .then(doc => {
                    // On informe tout les clients qu'il y a eu un nv contact
                    req.app.httpsIo.emit('order', {update: true})
                    if (process.env.DEV) {
                        req.app.httpIo.emit('order', {update: true})
                    }
                    send.sendData(res, doc)
                })
                .catch(err => {
                    send.sendError(res, 500, err)
                })
        }
    },

    toDelivery (req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: {accepted: true}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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

    accept (req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: {status: 'accepted'}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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

    decline (req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: {status: 'declined'}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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
    edit(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: req.body},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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

    pushMenu(req, res) {
        if (helper.isValidObjectId(req.body._id)) {
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {menu: req.body.menu}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {menu: req.body.menu}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$push: {article: req.body.article}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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
            order
                .findByIdAndUpdate({_id: req.body._id},
                    {$pull: {article: req.body.article}},
                    {new: true, useFindAndModify: false})
                .populate('article menu')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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
            order
                .findByIdAndDelete({_id: id})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('order', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('order', {update: true})
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

module.exports = orderController
