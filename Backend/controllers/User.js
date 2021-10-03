const user = require('../models/User')
const restaurant = require('../models/Restaurant')
const bcrypt = require("bcrypt");
const send = require('../utils/send.utils')
const help = require('../utils/help.utils')
const jwt = require('jsonwebtoken')

let userController = {

    get(req, res) {
        user
            .findAll()
            .then(users => {
                send.sendData(res, users)
            })
            .catch(err => {
                send.sendError(res, 500, err)
            })
    },

    getOne (req, res) {
        const id = req.params.id

        user.findOne({ where: {id: id} })
            .then(user => {
                send.sendData(res, user)
            })
            .catch(err => {
                send.sendError(res, 500, err)
            })
    },

    async create(req, res) {
        const test = await user.findOne({where: {email: req.body.email}})

        if (test) {
            return send.sendError(res, 409, {message: 'This email is already used'})
        }

        const newUser = {
            id: null,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            referalCode: help.randomValueHex(),
            referalCount: 0,
            address: req.body.address,
            active: 1,
            role: req.body.role
        }

        // On hash le mot de passe
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                send.sendError(res, 500, err)
            } else {
                bcrypt.hash(newUser.password, salt, function (err, pswd) {
                    if (err) {
                        send.sendError(res, 500, err)
                    } else {
                        newUser.password = pswd
                        user
                            .create(newUser)
                            .then(user => {
                                send.sendData(res, user)
                            })
                            .catch(err => {
                                send.sendError(res, 500, err)
                            })
                    }
                })
            }
        })
    },

    async registerRestaurant (req, res) {
        let referalUser
        if (req.body.referalCode) {
            referalUser = await user.findOne({where: {referalCode: req.body.referalCode}})
        }

        const test = await user.findOne({where:  {email: req.body.email}})
        if (test) {
            return send.sendError(res, 409, {message: 'This email is already used'})
        }

        const newUser = {
            id: null,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            referalCode: help.randomValueHex(),
            role: 2,
            sponsor: referalUser ? referalUser.id : null,
            referalCount: 0,
            address: req.body.address ? req.body.address : '',
            active: 1
        }

        // On hash le mot de passe
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                send.sendError(res, 500, err)
            } else {
                bcrypt.hash(newUser.password, salt, function (err, pswd) {
                    if (err) {
                        send.sendError(res, 500, err)
                    } else {
                        newUser.password = pswd

                        user
                            .create(newUser)
                            .then(user => {
                                const newRestaurant = new restaurant({
                                    user: user.id,
                                    name: req.body.restaurant.name,
                                    logo: null,
                                    type: req.body.restaurant.type
                                })

                                newRestaurant
                                    .save()
                                    .then(doc => {
                                        send.sendData(res,  {user: user, restaurant: doc})
                                    })
                                    .catch(err => {
                                        send.sendError(res, 500, err)
                                    })
                            })
                            .catch(err => {
                                send.sendError(res, 500, err)
                            })
                    }
                })
            }
        })
    },

    /**
     * Pour l'authentification de Nuxt
     * NE PAS MODIFIER
     * @param req  la requete envoyée
     * @param res  la reponse que retourne l'API
     *
     * Renvoie les infos de l'utilisateur
     */
    getUser(req, res) {
        let data = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        /*if (Date.now() >= data.exp * 1000) {
            send.sendError(res, 500,  'Le token n\'est plus valide')
        }*/

        user
            .findOne({where: {email: data.mail}})
            .then(user => {
                send.sendData(res, {user: user})
            })
    },

    /**
     * Pour l'authentification de Nuxt du restaurateur
     * NE PAS MODIFIER
     * @param req  la requete envoyée
     * @param res  la reponse que retourne l'API
     *
     * Renvoie les infos de l'utilisateur
     */
    async getRestaurantUser(req, res) {
        let data = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        /*if (Date.now() >= data.exp * 1000) {
            send.sendError(res, 500,  'Le token n\'est plus valide')
        }*/
        const rest = await restaurant.find({user: {$eq: data.id}})
        console.log(rest[0])
        user
            .findOne({where: {email: data.mail}})
            .then(user => {
                user.dataValues.restaurant = rest[0]
                send.sendData(res, {user: user})
            })
    },

    async delete(req, res) {
        const id = req.params.id
        let userTemp = await user.findOne({where: {id: id}})

        userTemp
            .destroy()
            .then(doc => {
                send.sendData(res, doc)
            })
            .catch(error => {
                send.sendError(res, 500, error)
            })
    },

    async edit(req, res) {
        const id = req.params.id
        let userTemp = await user.findOne({where: {id: id}})

        Object.entries(req.body).forEach(([key, item])=> {
            userTemp[key] = item
        })

        userTemp
            .save()
            .then(doc => {
                send.sendData(res, doc)
            })
            .catch(error => {
                send.sendError(res, 500, error)
            })
    },

    async editAvatar(req, res) {
        const id = req.params.id
        let userTemp = await user.findOne({where: {id: id}})

        //Si il y'a déja une photo on la delete
        if (userTemp.avatar) {
            await help.deleteFile(userTemp)
        }
        userTemp.avatar = await help.uploadFile(req.body)

        userTemp
            .save()
            .then(doc => {
                send.sendData(res, doc)
            })
            .catch(error => {
                send.sendError(res, 500, error)
            })
    },

    async block(req, res) {
        const id = req.params.id
        let userTemp = await user.findOne({where: {id: id}})

        userTemp.active = 0

        userTemp
            .save()
            .then(doc => {
                // On informe tout les clients qu'il y a eu une modification
                req.app.httpsIo.emit('user', {update: true, user: userTemp})
                if (process.env.DEV) {
                    req.app.httpIo.emit('user', {update: true, user: userTemp})
                }
                send.sendData(res, doc)
            })
            .catch(error => {
                send.sendError(res, 500, error)
            })
    },

    async unblock(req, res) {
        const id = req.params.id
        let userTemp = await user.findOne({where: {id: id}})

        userTemp.active = 1

        userTemp
            .save()
            .then(doc => {
                // On informe tout les clients qu'il y a eu une modification
                req.app.httpsIo.emit('user', {update: true, user: userTemp})
                if (process.env.DEV) {
                    req.app.httpIo.emit('user', {update: true, user: userTemp})
                }
                send.sendData(res, doc)
            })
            .catch(error => {
                send.sendError(res, 500, error)
            })
    }
}

module.exports = userController
