const express = require("express");

const https = require('https');
const app = express();



app.get("/",function(req, res){

    const url =  "https://api.kanye.rest/"

    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on('data',function(data){
            const joke = JSON.parse(data)
            // console.log(joke.quote)

        res.write("<p> The joke is:" + joke.quote + "</p>")
        res.write("<h2> But wait, this joke is better:" + joke.quote + "</h2>")
        res.send()

        })
    })
})

app.listen(3000,function(req, res){
    console.log("Server is up and running on port 3000")
}
    )

