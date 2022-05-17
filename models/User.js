const mongoose = require('mongoose')


// user Schema 
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        max: 20
    },
    email:{
        type: String,
        required: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Pleaserovide valid email'
        ],
        unique: true
    }, 
    password:{
        type: String,
        required: true,
        max: 24,
        min: 6
    },
    confirmPassword:{
        type: String,
        required: true,
        max: 24,
        min: 6
    },
    image:{
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }           
    
})


module.exports = mongoose.model("User", userSchema)