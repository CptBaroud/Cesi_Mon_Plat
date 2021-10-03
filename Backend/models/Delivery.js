const mongo = require('mongoose')
    , Schema = mongo.Schema

const delivery_schema = new Schema({
    deliveryMan: Number,
    client: Number,
    // 1 -> le livreur accepte la commande
    // 2 -> le restaurateur prepare la commande
    // 3 -> le livreur recupère la commande
    // 4 -> la livreur est en route => UNUSED
    // 5 -> le livreur à livrer la commande
    // 6 -> le livreur à livrer la commande confirmer par l'user
    status: {
        type: Number,
        default: 1
    },
    restaurant: {
        type: mongo.ObjectId,
        ref: 'Restaurant'
    },
    address: String,
    deliveryTime: Date,
    created: {
        type: Date,
        default: new Date(),
    },
    end: Date,
    done: {
        type: Boolean,
        default: false
    },
    order:  {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
})

const delivery = mongo.model('Delivery', delivery_schema)

module.exports = delivery
