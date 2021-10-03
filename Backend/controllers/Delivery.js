const delivery = require('../models/Delivery')
const send = require("../utils/send.utils");
const {validationResult} = require("express-validator");
const validator = require('../utils/help.utils')

let deliveryController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        delivery
            .find()
            .populate('restaurant order')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    console.log(err)
                    send.sendError(res, 500, err)
                }
            })
    },

    getUser(req, res) {
        delivery
            .find({client: req.params.user})
            .populate('restaurant order')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    console.log(err)
                    send.sendError(res, 500, err)
                }
            })
    },

    getRestaurant(req, res) {
        console.log(req.params.restaurant)
        delivery
            .find({restaurant: req.params.restaurant})
            .populate('restaurant order')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    console.log(err)
                    send.sendError(res, 500, err)
                }
            })
    },

    getDeliveryMan(req, res) {
        delivery
            .find({deliveryMan: req.params.user})
            .populate('restaurant order')
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    console.log(err)
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

        const newDelivery = new delivery({
            deliveryMan: req.body.deliveryMan,
            client: req.body.client,
            restaurant: req.body.restaurant,
            address: req.body.address,
            deliveryTime: req.body.deliveryTime,
            order: req.body.order
        })

        try {
            save = await newDelivery.save()
        } catch (e) {
            send.sendError(res, 500, e)
        }

        if (save) {
            delivery
                .populate(newDelivery, {path: 'restaurant order'})
                .then(doc => {
                    // On informe tout les clients qu'il y a eu un nv contact
                    req.app.httpsIo.emit('delivery', {update: true})
                    if (process.env.DEV) {
                        req.app.httpIo.emit('delivery', {update: true})
                    }
                    send.sendData(res, doc)
                })
                .catch(err => {
                    send.sendError(res, 500, err)
                })
        }
    },

    /**
     * Le livreur ouvre la livraison = il la prend en charge
     * @param req
     * @param res
     */
    open(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            delivery
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: {status: 1}},
                    {new: true, useFindAndModify: false})
                .populate('restaurant order')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('delivery', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('delivery', {update: true})
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
     * Le restaurateur prepare la commande a livrer
     * @param req
     * @param res
     */
    prepare(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            delivery
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: {status: 2}},
                    {new: true, useFindAndModify: false})
                .populate('restaurant order')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('delivery', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('delivery', {update: true})
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
     * Le livreur récupère la commande chez le restaurateur
     * @param req
     * @param res
     */
    taken(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            delivery
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: {status: 3}},
                    {new: true, useFindAndModify: false})
                .populate('restaurant order')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('delivery', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('delivery', {update: true})
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
    close(req, res) {
        console.log(req.params.delivery)
        if (validator.isValidObjectId(req.params.delivery)) {
            delivery
                .findByIdAndUpdate({_id: req.params.delivery},
                    {$set: {done: true, status: 6}},
                    {new: true, useFindAndModify: false})
                .populate('restaurant order')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('delivery', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('delivery', {update: true})
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

    closeDeliveryMan(req, res) {
        if (validator.isValidObjectId(req.params.delivery)) {
            delivery
                .findByIdAndUpdate({_id: req.params.delivery},
                    {$set: {status: 5}},
                    {new: true, useFindAndModify: false})
                .populate('restaurant order')
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('delivery', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('delivery', {update: true})
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
        if (validator.isValidObjectId(req.body._id)) {
            delivery
                .findByIdAndDelete({_id: req.query._id})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('delivery', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('delivery', {update: true})
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

module.exports = deliveryController
