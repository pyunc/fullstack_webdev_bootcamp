// general requirements

const express = require("express");
const bodyParser = require('body-parser');
// const request = require("request");

// server

const app = express();
const https = require('https');

app.use(express.static("public"))


app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {

    var firstName = req.body.fName;
    var lastName = req.body.sName;
    var email = req.body.email;

    console.log(firstName, lastName, email)


    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,

            },

        }]
    }

    var jsonData = JSON.stringify(data)

    const list_id = '926fcb907f'

    const url = 'https://us7.api.mailchimp.com/3.0/lists/926fcb907f'

    const options = {
        method: 'POST',
        auth: 'pauloyc:1fdaee9c498db66a905510db048f4cb6-us7'
    }

    const request = https.request(url, options, function (response){

        if (response.statusCode == 200){
            res.sendFile(__dirname+"/success.html")
        } else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();
})


app.post("/failure",function (req,res){
    res.redirect("/")
})

app.listen(process.env.PORT|| 3000, function (req, res) {
    console.log("Server is up and running on port 3000")
})


// apikey
// 1fdaee9c498db66a905510db048f4cb6-us7

// audience
// 926fcb907f