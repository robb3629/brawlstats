const {Schema, model} = require('mongoose')

const playerTag = new Schema({
    userId: {
        type: String,
        required: true,
    },
    thugger: {
        type: String,
        required: true,
    }
})


module.exports = model('00tags', playerTag)