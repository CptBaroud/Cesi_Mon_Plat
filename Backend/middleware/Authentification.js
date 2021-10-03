const jwt = require('jsonwebtoken')

/**
 * Middleware verifiant la validité d'un token
 * @param req - la requete envoyée
 * @param res - la reponse à envoyé
 * @param next - la fonction suivante
 * @returns {this} - soit un 404 ou laisse l'API continuer
 */
function isAuthenticated(req, res, next) {
    const token = getToken(req, res)
    console.log(token)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) {
            return res.status(404).send({
                message: 'Invalid Token',
                error: err,
                stack: err.stack
            })
        }
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function checkRight(req, res, next, role) {
    const token = getToken(req, res)

    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })

        if (!role.includes(data.role)) return res.status(403).send({
            message: 'Access forbiden'
        })
    })
}

function isClient(req, res, next) {
    const token = getToken(req, res)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })
        if (data.role === 5) return next()

        //On check si l'user est bien un client
        if (data.role !== 0) return res.status(403).send({
            role: data.role,
            message: 'Invalid role'
        })
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function isRestaurant(req, res, next) {
    const token = getToken(req, res)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })
        if (data.role !== 5 || data.role !== 2) {
            console.log('good')
        }

        if (data.role === 5) return next()

        //On check si l'user est bien un client
        if (data.role !== 2) return res.status(403).send({
            role: data.role,
            message: 'Invalid role'
        })
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function isDeliveryMan(req, res, next) {
    const token = getToken(req, res)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })
        if (data.role === 5) return next()

        //On check si l'user est bien un client
        if (data.role !== 1) return res.status(403).send({
            role: data.role,
            message: 'Invalid role'
        })
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function isCommercial(req, res, next) {
    const token = getToken(req, res)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })
        if (data.role === 5) return next()

        //On check si l'user est bien un client
        if (data.role !== 3) return res.status(403).send({
            role: data.role,
            message: 'Invalid role'
        })
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function isTechnic(req, res, next) {
    const token = getToken(req, res)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })
        if (data.role === 5) return next()

        //On check si l'user est bien un client
        if (data.role !== 4) return res.status(403).send({
            role: data.role,
            message: 'Invalid role'
        })
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function isAdmin(req, res, next) {
    const token = getToken(req, res)
    // On verifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET_SIGN, (err, data) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreur
        if (err) return res.status(404).send({
            message: 'Invalid Token',
            error: err,
            stack: err.stack
        })
        //On check si l'user est bien un client
        if (data.role !== 5) return res.status(403).send({
            message: 'Invalid role'
        })
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function getToken (req, res) {
    //On check si il y a un token
    if (!req.headers.authorization) return res.status(404).json({
        message: 'Missing Token',
        error: 'Token not found or null'
    })

    // On recupere le token dans les headers
    // Et on vire le prefix bearer
    const token = req.headers.authorization.replace('Bearer ', '')

    // Si le token est null on renvoit une erreur 404
    if (!token) return res.status(404).json({
        message: 'Missing Token',
        error: 'Token not found or null'
    })
    return token
}

module.exports = { isAuthenticated, isClient, isAdmin, isDeliveryMan, isCommercial, isTechnic, isRestaurant, checkRight }
