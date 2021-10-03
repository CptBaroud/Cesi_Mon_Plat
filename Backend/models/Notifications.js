const mongo = require('mongoose')
    , Schema = mongo.Schema

const notifications_schema = new Schema({
    // type 0 -> info
    // type 1 -> success
    // type 2 -> error
    info: Object,
    created: { type: Date, default: Date.now() },
    user: Number,
    seen: Boolean,
    read: Boolean,
    title: String,
    to: String
})

const notifications = mongo.model('notification', notifications_schema)

module.exports = notifications
