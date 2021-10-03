const mongo = require('mongoose')
    , Schema = mongo.Schema

const restaurant_schema = new Schema({
    // l'user lié au restaurant
    user: Number,
    name: String,
    description: String,
    logo: String,
    type: String,
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    article: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
})

const restaurant = mongo.model('Restaurant', restaurant_schema)

module.exports = restaurant
