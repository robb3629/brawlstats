const {Schema, model} = require('mongoose')

const economy = new Schema({
    userId: {
        type: String,
        required: true,
    },
    Coins: {
        type: Number,
        default: 0,
    },
    LastDaily : {
        type: Date,
        required: false,
    }

})


module.exports = model('00economy', economy)