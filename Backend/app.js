const mongo = require("mongoose");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('morgan');
const log = require('log-beautify');
const cors = require("cors");
const jwt = require('./utils/jwt.utils')
// Génération de la doc
const swaggerUi = require('swagger-ui-express');

// Load the constant from .env file
require('dotenv').config()

// Require logger.js
const winstonlogger = require('./utils/log.utlis');

if (process.env.DEV) {
    log.info(jwt.generatedToken({role: 5, id: 1, email: 'gurvan.seveno@gmail.com'}))
}

// Mongodb connection
mongo.connect(process.env.MONGODB_LINK, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        log.ok('Connexion a mongodb')
    })
    .catch((error) => {
        log.error(error)
        winstonlogger.error('Erreur de connexion a mongodb')
        winstonlogger.error(error)
    })

// On doit attendre que le .env soit load
const SQLDB = require("./db/db.sql");

SQLDB.authenticate()
    .then(() => {
        log.ok('Connexion a SQL Server')
    })
    .catch((error) => {
        log.error(error)
        winstonlogger.error('Erreur de connexion a SQL Server')
        winstonlogger.error(error)
    })

const app = express();

// Swagger doc generation
const swaggerDefinition = require('./OpenApiDocumentation')

// Avoid cross scripting
app.use(cors())
// Prevent from NoSQL injection
app.use(mongoSanitize());
app.use(logger('dev'));
// Limite de taille des fichiers
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// On load toutes les routes
const route = require('./routes/index')

app.use(route)

module.exports = app;
