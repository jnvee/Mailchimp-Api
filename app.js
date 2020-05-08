const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname ,
                    LNAME: lname
                } 
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us18.api.mailchimp.com/3.0/lists/cdcdadfa34",
        method: "POST",
        headers: {
            "Authorization": "jnvee dabe5d56aa0c02be9193969c7e63177d-us18"
        },
        body: jsonData
        };

    request(options, function(error, response, body){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else if (error){
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
            
        }
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server up and running.");
    
});


// dabe5d56aa0c02be9193969c7e63177d-us18 - API key Mailchimp
//List Id - cdcdadfa34