const express = require('express');

const db = require('./db')();

const app = express()

//BODY PARCER
app.use(express.json())







const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`)
})