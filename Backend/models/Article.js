const mongo = require('mongoose')
    , Schema = mongo.Schema

const article_schema = new Schema({
    name: String,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    description: String,
    price: Number,
    type: Number,
    ingredient: [
        String
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const article = mongo.model('Article', article_schema)

module.exports = article
