const express = require("express");

const https = require('https');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function (req, res) {

    const url = "https://api.kanye.rest/"
    const name = req.body.input_name

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on('data', function (data) {
            const joke = JSON.parse(data)
            console.log(joke.quote)


            res.write("<h1> Todays inspiration drop" + " for " + name + "</h1>")
            res.write("<h1>" + joke.quote + "</h1>")
            res.send()

        })
    })
})

app.listen(5000, function (req, res) {
    console.log("Server is up and running on port 3000")
})