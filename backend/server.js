const express = require('express');
require('dotenv').config();
const getSecoes = require("./db");
const app = express();

app.use(express.json());

app.use("/",express.static("../frontend/build"))
app.post("/secoes", (req, res) => {
  getSecoes(req.body).then((a) => {
    // console.log(a);
    res.send({data:a[0],numberOfRows:a[1]})});
  req.body; // JavaScript object containing the parse JSON
  
});

console.log(`Eleições App running on port ${process.env.PORT}`)
const server = app.listen(process.env.PORT);
