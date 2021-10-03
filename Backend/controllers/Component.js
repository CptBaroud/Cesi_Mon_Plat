const component = require('../models/Component')
const send = require("../utils/send.utils");
const validator = require('../utils/help.utils')
const {validationResult} = require("express-validator");

let componentController = {
    /**
     * @param req
     * @param res
     */
    get(req, res) {
        component
            .find()
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

        const newCategory = new component({
            name: req.body.name,
            link: req.body.link
        })

        try {
            save = await newCategory.save()
        } catch (err) {
            return send.sendError(res, 500, err)
        }

        if (save) {
            // On informe tout les clients qu'il y a eu un nv contact
            req.app.httpsIo.emit('component', {update: true})
            if (process.env.DEV) {
                req.app.httpIo.emit('component', {update: true})
            }
            send.sendData(res, save)
        }
    },

    /**
     *
     * @param req
     * @param res
     */
    edit(req, res) {
        if (validator.isValidObjectId(req.body._id)) {
            component
                .findByIdAndUpdate({_id: req.body._id},
                    {$set: req.body},
                    {new: true, useFindAndModify: false})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('component', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('component', {update: true})
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
            component
                .findByIdAndDelete({_id: id})
                .exec(function (err, doc) {
                    if (!err) {
                        // On informe tout les clients qu'il y a eu un nv contact
                        req.app.httpsIo.emit('component', {update: true})
                        if (process.env.DEV) {
                            req.app.httpIo.emit('component', {update: true})
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

module.exports = componentController
