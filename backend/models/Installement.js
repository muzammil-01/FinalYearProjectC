const mongoose = require('mongoose')
const { Schema } = mongoose


const installment = new Schema({
    Buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    propertyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property'
    },
    totalTokens:{
        type:Number,
    },
    distributedAmount : {
        type:Number,
    },
    PricePerToken:{
        type:String,
        required: true
    },
    duration : {
        typo : {
            type: String,
            required: true
        },
        number : {
            type: Number,
            required: true
        }
    },
    aquiredToken : {
        type:Number,
        default: null
    },
    remainingTokens:{
        type:Number,
        default: null
    },
    startDate : {
        type: Date,
        default: null
    },
    endDate : {
        type: Date,
        default: null
    },

  
})
module.exports = mongoose.model('installment', installment)
