const mongoose = require('mongoose')

const partySchema = new mongoose.Schema({
    // _id:{
    //     type:String,
    // },
    name:{
        type:String,
    },
    date:{
        type:String,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },
    firstdj:{
        type:String,
    },
    seconddj:{
        type:String,
    },
    price:{
        type:Number,
    },
    NoOfCards:{
        type:Number,
    },
    imageFirst:{
        type:String,
    },
    imageSecond:{
        type:String,
    },
    imageThird:{
        type:String,
    },
    imageFourth:{
        type:String,
    },
})

module.exports = mongoose.model('party', partySchema)