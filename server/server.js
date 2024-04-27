const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    console.log("here")
    //views a json file on the server port
    res.render("index", { text: "World" })
    //sends a file to be downloaded by the client

})


app.listen(5000)