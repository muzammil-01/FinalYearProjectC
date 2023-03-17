require('dotenv').config();
const connectToMongo = require('./db')
const path = require('path')
const express = require("express")
var cors = require('cors')
const bodyParser = require("body-parser")
const cron = require('node-cron');
const Auction = require('./models/Auction')
const Property = require('./models/Property')
const PropertyRoutes = require("./routes/addproperty")
const swagger = require("./swagger")
const swaggerUi = require('swagger-ui-express');
connectToMongo();


const app = express()
const PORT = process.env.PORT


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', '*')
    next()
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/api/auth', require('./routes/auth'))
app.use(PropertyRoutes)
app.use('/api/upload', require('./routes/uploadRoutes'))
app.use("/api", require('./routes/buyer'))
app.use("/search", require('./routes/searchRoute'))

app.use("/public", express.static('public'))

app.get("/", (req, res) => {
    res.json("server start")
})

// // Schedule a task to run every minute to check for ended auctions  
// cron.schedule('* * * * *', async () => {
//     const now = new Date();
//     try{
//         const currentDate = new Date();
//         const filter = { endDate: { $lt: currentDate } };
//         const result = await Auction.find(filter);
//         if(result.length > 0) {
//             await Promise.all(result.map(async(obj)=>{
//                 const _id = `${(obj._id).toString()}`
//                 console.log(_id)
//                 if(obj.users.length > 0){
//                     update = {
//                         winner: true,
//                         propertyId: _id
//                     }
//                     await Auction.findByIdAndUpdate(_id,{ IsEnded: true, winner: obj.users[0].userId } );
//                 }else {                                               
//                     await Auction.findByIdAndUpdate(_id,{ IsEnded: true } );
//                 }
//                 await Property.findByIdAndUpdate(_id, { inAuction: false });
//             })
//             )
//             console.log("**")
//         } else {
//             console.log("no one")
//         }
//         console.log("done")
//     }catch(e){
//         console.log(e)
//     }
// });



app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})