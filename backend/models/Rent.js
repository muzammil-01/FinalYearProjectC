const mongoose = require('mongoose')
const { Schema } = mongoose


const rent = new Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    propertyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property'
    },
    rentAmount:{
        type: String,
        required: true
    },
    startDate : {
        type : Date,
        require : true
    },
    endDate : {
        type : Date,
        require : true
    }
})
module.exports = mongoose.model('rent', rent)
