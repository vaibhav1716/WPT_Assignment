const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.static("./Sf"));

app.get('/addItem', (req, resp) => {

    resp.send("Add item needs to be done")

});

app.get('/updateItem', (req, resp) => {

    resp.send("Update item needs to be done");

});
app.listen(80, () => {

    console.log("hello nodjs is working");

});