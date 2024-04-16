const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const app = express();

// import routes
const commitRoutes = require('./src/commits/route');
const summaryRoutes = require('./src/summary/routes');
const callbackRoutes = require('./src/callback/routes');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const clientWebsite = "https://github-client-app.onrender.com";

//connect to DB
//listen after db connection has been est
mongoose
    .connect(process.env.DB_CONNECT)
    .then((results) => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use(
    cors({
        origin: clientWebsite,
        credentials: true,
    })
);    

app.use('/api/commits', commitRoutes);
app.use('/api/repo',  summaryRoutes) 
app.use('/api/callback', callbackRoutes) 

app.get("/", (req, res) => {
    res.send("<h3>Oops!!! You took a wrong turn...</h3>");
});