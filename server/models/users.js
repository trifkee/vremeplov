const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        // require: true,
        min: 3,
        max:20,
        unique: true,
    },
    email:{
        type:String,
        // required: true,
        max:50,
        // unique: true,
    },
    password:{
        type:String,
        // required:true,
        min:6,
    },
    role:{
        type:String,
    },
    cardsTotal:{
        type:Number,
    },
    cardsSold:{
        type:Number,
    },
    cardsLeft:{
        type:Number,
    },
},

{timestamps:true})

module.exports = mongoose.model('user', userSchema)