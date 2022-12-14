const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({

    topText:{
        type: String
    },
    bottomText:{
        type: String
    },
    url:{
        type: String
    }
});


module.exports = mongoose.model('Meme',memeSchema)