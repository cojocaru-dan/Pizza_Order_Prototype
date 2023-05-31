const http = require('http')
const fs = require('fs')
const express = require('express')
const { error } = require('console')
const app = express()
const port = 5500

// that is the line for integrate script.js in html
app.use(express.static("./frontend"));
// app.use("frontend", express.static(__dirname + '/frontend/public'));
app.use("/pizza", express.static("./frontend"));

app.get("/", (req, res)=> {
    res.sendFile(`${__dirname}/frontend/index.html`);
})

app.get("/api/pizza", (req, res)=> {
    res.sendFile(`${__dirname}/pizza.json`);
})

app.get("/api/allergen", (req, res)=> {
    res.sendFile(`${__dirname}/allergens.json`);
})

app.get("/pizza/list", (req, res) => {
    // const pizzaData = fs.readFileSync(`${__dirname}/pizza.json`, "utf8");
    // console.log(pizzaData);
    // res.json(pizzaData);
    res.sendFile(`${__dirname}/frontend/pizzalist.html`);
})

app.listen(port, ()=> {
    console.log(`App is listening on http://localhost:${port}`);
})