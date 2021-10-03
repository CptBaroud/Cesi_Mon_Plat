const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../db/db.sql')

const User = sequelize.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referalCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sponsor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        notEmpty: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 0 - User de base => le client
    // 1 - User livreur => le livreur
    // 2 - User Restaurateur => le restaurateur
    // 3 - User Service Commercial
    // 4 - User Dep. technique
    // 5 - User Admin
    // 6 - User Developpeur
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = User
