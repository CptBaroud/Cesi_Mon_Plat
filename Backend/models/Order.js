const mongo = require('mongoose')
    , Schema = mongo.Schema

const order_schema = new Schema({
    user: Number,
    address: String,
    created: {
      type: Date,
      default: new Date()
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    accepted: {
        type: Boolean,
        default: null
    },
    status: {
        type: String,
        default: 'pending'
    },
    price: Number,
    article: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }]
})

const order = mongo.model('Order', order_schema)

module.exports = order
