const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    picture:{
        type: String
    },
    email:{
        type: String
    },
    verified:{
        type: Boolean
    },
    password: {
        type: String
    }
});


module.exports = mongoose.model('User',userSchema)