require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', require("./Routes/MemeRoutes"));
app.use('/api', require("./Routes/UserRoutes"));

// conection with DB
mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.CONNECTION_URL,
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if(err) throw err;
        console.log("Boo yeah! Connected to MongoDB")
    },
);

const port = process.env.port

app.listen(port, () => {
    console.log(`Listening port localhost : ${port}`);
});