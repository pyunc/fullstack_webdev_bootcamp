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

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var phone = req.body.phone;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                PHONE: phone
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

    const request = https.request(url, options, function (response) {
        response.on('data', function (data) {
            console.log(JSON.parse(data));

        })

    })

    request.write(jsonData);
    request.end();


})

app.listen(3000, function (req, res) {
    console.log("Server is up and running on port 3000")
})


// apikey
// 1fdaee9c498db66a905510db048f4cb6-us7

// audience
// 926fcb907f