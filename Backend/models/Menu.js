const mongo = require('mongoose')
    , Schema = mongo.Schema

const menu_schema = new Schema({
    name: String,
    description: String,
    price: Number,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    article: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
})

const menu = mongo.model('Menu', menu_schema)

module.exports = menu
