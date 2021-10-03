const category = require('../models/Category')
const send = require("../utils/send.utils");
const validator = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let categoryController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        category
            .find()
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    getCategory(req, res) {
       category
           .find({type: req.params.type})
           .exec(function (err, doc) {
               if (!err) {
                   send.sendData(res, doc)
               } else {
                   send.sendError(res, 500, err)
               }
           })
    },

    getRestaurantCategory(req, res) {
       category
           .find({restaurant: {$eq: req.params.restaurant}})
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

        const newCategory = new category({
            name: req.body.name,
            description: req.body.description,
            restaurant: req.body.restaurant,
            type: req.body.type
        })

        try {
            save = await newCategory.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            category
                .populate(newCategory, {path: 'Category'})
                .then(doc => {
                    // On informe tout les clients qu'il y a eu un nv contact
                    req.app.httpsIo.emit('category', {update: true})
                    if (process.env.DEV) {
                        req.app.httpIo.emit('category', {update: true})
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
            category
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: req.body},
                    {new: true, useFindAndModify: false})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('category', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('category', {update: true})
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
        if (validator.isValidObjectId(id)) {
            category
                .findByIdAndDelete({_id: id})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('category', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('category', {update: true})
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

module.exports = categoryController
