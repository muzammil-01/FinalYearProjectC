const express = require('express')
var mongoose = require('mongoose');
const Property = require('../models/Property')
const ListingTokens = require('../models/ListingTokens')
const Buyer = require('../models/Buyer')
const Auction = require('../models/Auction')
const { validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const multer = require('multer')
const Rent = require('../models/Rent');
const User = require('../models/User')
const { application } = require('express');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })
const Arrayupload = upload.fields([{ name: "propertyImages", maxCount: 10 }, { name: "propertyDocuments", maxCount: 10 }])




// fetch all properties GET /api/property/allproperties
router.get("/allproperties", async (req, res) => {
    const properties = await Property.find({ property: req.body._id })
    res.send({
        status: "success",
        properties
    })
})


//api to add token for sell in listing table and buyer table
// route: /api/property/checkToken
router.post("/checkToken", fetchuser, async (req, res) => {
    console.log(req.body)
    try {
        listing = await ListingTokens.create({
            user: mongoose.Types.ObjectId(req.user.id),
            propertyId: mongoose.Types.ObjectId(req.body.propertyId),
            SellerWalletAddress: req.body.SellerWalletAddress,
            TotalSupplies: req.body.TotalSupplies,
            PricePerToken: req.body.PricePerToken,
            NumberOfTokenPerWallet: req.body.numberOfTokenPerWallet
        })
        await Buyer.findByIdAndUpdate(req.body.BuyerId, { quantity: req.body.RemainingTokens });
        res.send({
            status: "success",
            listing
        })
    } catch (error) {
        console.log(error)
    }

})
router.get("/P", (req, res) => {
    res.json("server start")
})

//api to make bid by using propertyId
// route: /api/property/bid/:id
router.patch("/bid/:id", async (req, res) => {
    try {
        console.log(req.body)
        const id = req.params.id;
        const properties = await Auction.findOne({ propertyId: id })
        if (!properties) {
            return res.json({
                status : "fail",
                message : "this property  isn't on auction"
            })
        } else if(properties.IsEnded){
            return res.json({
                status : "fail",
                message : "this auction has ended"
            })
        } else if(properties.minBid > parseInt(req.body.bidAmount)){
            return res.json({
                status : "fail",
                message : "Bid amount is lesser than minimum bid"
            })
        }

        let array = properties.users
        console.log(array)
        var t;
        array.find(obj => {
            if (obj.userId === req.body.userId) {
                if (obj.bidAmount >= req.body.bidAmount) {
                    t = "no"


                } else {
                    obj.bidAmount = req.body.bidAmount
                    
                    t = "yes"
                }
            }
        })
        properties.save()
        if (t == "no") {
            return res.json({
                status: "fail",
                message: "your previous Bid is greater. You can not bid"
            })
        } else if (t == "yes") {
            return res.json({
                status: "success",
                message: "you have successfuly replace your old bid with new one"
            })
        } else {
            const options = { new: true, select: { users: { _id: 0 } } };

            const result = await Auction.findOneAndUpdate({ propertyId: id }, { $push: { users: { $each: [req.body], $sort: { bidAmount: -1 } } } }, options);

            res.send({
                status: "success",
                result
            })
        }

    } catch (error) {
        console.log(error.message)
    }
})
















































































router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await Property.findByIdAndUpdate(id, updates, options);
        return res.json({ 
            status : "Success",
            result
        })
    } catch (error) {
        console.log(error.message)
    }
})

// fetch all user specific properties GET /api/property/userproperties
router.get("/userproperties", fetchuser, async (req, res) => {
    try {
        const use = await Property.find({ user: req.user.id })
        return res.json({ 
            status : "Success",
            use
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})
// fetch all properties by id GET /api/property/:id
router.get("/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const listing = await Property.findOne({ propertyId: req.params.id });
        return res.json({ 
            status : "Success",
            listing
        })
    } catch (e) {
        return res.status(404).json('Product not found')
    }
})
router.get("/getTokenForSale/:propertyId", async (req, res) => {
    try {
        console.log(req.params.id)
        const listing = await ListingTokens.find({ propertyId: req.params.propertyId });
        console.log(listing)
        return res.json({ 
            status : "Success",
            listing
        })
    } catch (e) {
        return res.status(404).json('Product not found')
    }
})
router.post("/propertyTokens/:id", async (req, res) => {
    const listing = await ListingTokens.findOne({ propertyId: req.params.id });
    console.log(listing)
    var a = parseInt(listing.TotalSupplies)
    console.log("a====", a)
    console.log("req.body.TotalSupplies====", req.body.TotalSupplies)

    if (a != req.body.TotalSupplies) {
        req.body.TotalSupplies = a - req.body.TotalSupplies
        const options = { new: true };
        console.log("req.body.TotalSupplies****", req.body.TotalSupplies)
        await ListingTokens.findByIdAndUpdate(listing._id, { TotalSupplies: req.body.TotalSupplies }, options);
        return res.json({ 
            status : "Success",
            message: "successfully updated"
        })
    }
    else {
        await ListingTokens.findByIdAndRemove({ _id: id })
        res.json("deleted successfully")
    }


})

//checked **********************************************************************************

//api to get the all the bids of different properties including auction infromation made by specific user using  userId
//route: /getBids/:id
//user : tenant
router.get("/getBids/:id", async (req, res) => {
    try {
        console.log("kkk")
        const id = req.params.id;
        const properties = await Auction.find({ "users.userId": req.params.id })
        return res.json({ 
            status : "Success",
            properties
        })
    } catch (error) {
        console.log(error.message)
    }
})

// add property using route '/api/property/check' Auth required
router.post('/check', fetchuser, Arrayupload, async (req, res) => {
    console.log("_________________-",req.body)
    // if there are errors return bad request and errors
    const prop = await Property.findOne({ propertyAddress: req.body.propertyAddress })
    if (prop) {
        return res.status(400).json({
            status: "error",
            message: "property with this address already exist"
        });
    }
    try {
        const arrPropertyImages = []
        for (let i = 0; i < req.files.propertyImages.length; i++) {
            arrPropertyImages.push(req.files.propertyImages[i].originalname)
        }
        const arrPropertyDocuments = []
        for (let i = 0; i < req.files.propertyDocuments.length; i++) {
            arrPropertyDocuments.push(req.files.propertyDocuments[i].originalname)
        }
        let addProperty = await Property.create({
            user: req.user.id,
            ownerName: req.body.ownerName,
            PropertyContractAddress: req.body.PropertyContractAddress,
            OwnerWalletAddress: req.body.OwnerWalletAddress,
            propertyAddress: req.body.propertyAddress,
            propertyPrice: req.body.propertyPrice,
            propertyImages: arrPropertyImages,
            propertyDocuments: arrPropertyDocuments,
            beds: req.body.beds,
            baths: req.body.baths,
            size: req.body.size,
            country: req.body.country,
            city: req.body.city,
            postalcode: req.body.postalcode,
            numberOfSupplies: req.body.numberOfSupplies,
            isRentable : req.body.isRentable,
            Installment : req.body.Installment


        })
        res.json({ 
            status : "Success",
            addProperty
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }
})


// fetch all properties of specific user by userid 
// route = get-property-by-user/:id
router.get("/get-property-by-user/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const listing = await Property.find({ user: req.params.id }).lean();
        const tokens = await ListingTokens.findOne({ propertyId: listing._id });
        listing.TokenForSale = tokens
        
        const data = await Promise.all(listing.map(async (property) => {
            if (property.inAuction) {
                const auction = await Auction.findOne({ propertyId: property._id });
                property.auction = auction;
            } else if (property.isRented) {
                const tenant = await Rent.findOne({ propertyId: property._id }).populate('tenant');
                property.tenant = tenant;
            }
            return property;
        }));
        return res.json({ 
            status : "Success",
            data 
        })
    } catch (e) {
        console.log(e)
        return res.status(404).json('Product not found')
    }
})

// fetch specifc properties by propertyId 
// route = get-property/:id
router.get("/get-property/:id", async (req, res) => {
    
    try {
        console.log(req.params.id)
        const listing = await Property.findById(mongoose.Types.ObjectId(req.params.id)).lean();
        const tokens = await ListingTokens.findOne({ propertyId: req.params.id });
        if(tokens){
            listing.TokenForSale = [tokens]
        }
        if (listing.inAuction) {
            const auction = await Auction.findOne({ propertyId: listing._id });
            listing.auction = auction
            if(auction.users.length > 0){
                console.log(auction.users[0])
                listing.highestBidder = await User.findById(auction.users[0].userId);
            } else {
                listing.highestBidder = "no bid yet"
            }
            console.log("**********************",listing)
        } else if (listing.isRented) {
            const tenant = await Rent.findOne({ propertyId: listing._id }).populate('tenant');
            listing.tenant = tenant;''
        }
        return res.json({ 
            status : "Success",
            listing 
        })
    } catch (e) {
        console.log(e)
        return res.status(404).json('Product not found')
    }
})


//api to start the auction by updating auction table and property table by using propertyId
// route: /startAuction/:id
router.post("/startAuction/:id", fetchuser, async (req, res) => {
    try {

        const id = req.params.id;
        //crdeating auction 
        const properties = await Property.findOne({ _id: id })
        console.log(properties)

        //isrented should be false here.....
        //inAuction should be false here.... 
        if (properties.isRented ) {
            return res.json("this property is on rent")
        }
        if (properties.inAuction) {
            return res.json("sorry this property is already on Auction")
                
        }

        await Auction.create({
            propertyId: id,
            users: [],
            startDate: req.body.startDate, //2002-12-09
            endDate: req.body.endDate,
            minBid : req.body.minBid
        })

        //updating property table   
        const updates = req.body;
        const options = { new: true };

        const result = await Property.findByIdAndUpdate(id, { inAuction: true }, options);
        return res.json({ 
            status : "Success",
            result 
        })
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router