const express = require('express')
var mongoose = require('mongoose');
const ListingTokens = require('../models/ListingTokens')
const Buyer = require('../models/Buyer')
const Auction = require('../models/Auction')
const { validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const multer = require('multer')
const Property = require('../models/Property')
const Installement = require('../models/Installement');
const { application } = require('express');


//opening the property for installement
//owner will set the details using this api
router.post('/open-installment/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
    
        const property = await Property.findOne({ _id: id })
    
        if (property.isInstallment == 'accepted') {
            return res.json("property is already on Installment")
        }
        if (property.numberOfSupplies < req.body.totalTokens) {
            return res.json("total tokens can not be greater than numberofSupplies")
        }

        await Installement.create({
            propertyId: id,
            downTokens:   req.body.downTokens,
            totalTokens:  req.body.totalTokens,
            PricePerToken: req.body.PricePerToken,
            duration : {
                typo : req.body.typo,
                number : req.body.number
            },
        })

        await Property.findByIdAndUpdate(id, {Installment : 'open' });

        return res.json({
            status :" success"
        })
    } catch(e){
        console.log(e)
    }
    
})

//requesting the property for installement
//buyer will make ACCEPT  for getting property on intallement
router.patch('/accpet-installment/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
    
        const property = await Property.findOne({ _id: id })
        if (property.isInstallment == 'accepted') {
            return res.json("property is already on Installment")
        }
        if (property.isInstallment == 'noInstallement') {
            return res.json("property is not on Installment")
        }
        
        const installment = await Installement.findOne({ propertyId: id })
        
        if(installment.remainingTokens == 0 ){
            return res.json("installment has been completed")
        }
        if(installment.distributedAmount != req.body.aquiredToken){
            return res.json("aquiredToken should be equal to distributedAmount")
        }
        await Installement.updateOne({ propertyId: id },{
            aquiredToken : req.body.aquiredToken,
            remainingTokens: installment.totalTokens - req.body.aquiredToken,
            startDate : req.body.startDate,
            endDate : req.body.endDate
        })

        await Property.findByIdAndUpdate(id, {Installment : 'accepted' });

        return res.json({
            status :" success"
        })

    } catch(e){
        console.log(e)
    }
})

router.get('/get-installment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const property = await Installement.findOne({ propertyId: id })
        return res.json(property)

    } catch(e){
        console.log(e)
    }
})

module.exports = router