const mongo = require('mongoose')
    , Schema = mongo.Schema

const component_schema = new Schema({
    name: String,
    link: String
})

const component = mongo.model('Component', component_schema)

module.exports = component
