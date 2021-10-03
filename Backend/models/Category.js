const mongo = require('mongoose')
    , Schema = mongo.Schema

const category_schema = new Schema({
    name: String,
    description: String,
    restaurant: {
        type: mongo.ObjectId,
        ref: 'restaurant'
    },
    // 0 -> Catégories de restaurant
    // 1 -> Catégories de plats
    // 2 -> Catégories de menu
    type: Number
})

const category = mongo.model('Category', category_schema)

module.exports = category
