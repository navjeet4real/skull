require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
  

// Connection with Mongodb.
mongoose.connect(
    process.env.CONNECTION_URL,
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
      },
      (err) => {
        if (err) throw err;
        console.log("connected to mongodb");
      },
    );
    
  
const port = process.env.PORT;
  
app.listen(port,() => {
	console.log(`listening port localhost : ${port}`);
});