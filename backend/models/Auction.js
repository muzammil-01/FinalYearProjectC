const mongoose = require('mongoose')
const { Schema } = mongoose
const auction = new Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        unique: true // make the propertyId field unique
    },
    users : [
        {
            userId: {
                type: String,
                ref: 'user',
            },
            bidAmount : {
                type: Number,
            },
            require:false,
            // unique: true // make the combination of userId and bidAmount unique
        }
    ],
    minBid:{
        type:Number,
        required: true
    },
    startDate : {
        type: Date,
        require : true
    },
    endDate : {
        type: Date,
        require : true
    },
    IsEnded : {
        type: Boolean,
        default: false
    }
    
})
module.exports = mongoose.model('auction', auction)