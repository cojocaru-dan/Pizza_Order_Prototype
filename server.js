const http = require('http')
const fs = require('fs')
const express = require('express')
const { error } = require('console')
const app = express()
const port = 5500


// app.use("/public", express.static(__dirname + '/public'));

app.get("/api/pizza", (req, res)=> {
    res.sendFile(`${__dirname}/pizza.json`);
})

app.get("/api/allergen", (req, res)=> {
    res.sendFile(`${__dirname}/allergens.json`);
})

app.listen(port, ()=> {
    console.log(`App is listening on ${port}`);
})