require('dotenv').config();
const express = require("express");
const cors=require("cors");
const DB = require("./config/db")

const config = require("./config/config")
const route = require("./routes");

DB().then(() => console.log("DB up!")).catch(err => console.log(err))

const app = express();

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
app.use(express.json());

const port = config.PORT;

app.use("/api", route)

app.listen(port, () => {
    console.log("api server is up!")
})