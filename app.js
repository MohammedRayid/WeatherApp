const express = require("express");
const bodyParser = require("body-parser");
const https =require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
const query = req.body.cityName;
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=ad7e712847589dad517c951921a4502b";
https.get(url,function(response){
    console.log(response.statusCode);
response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const desc = weatherData.weather[0].main;
    const icon = weatherData.weather[0].icon;
    const imgurl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
    res.write("<h1>The temperature is : "+temp+"</h1>");
    res.write("<p>Weather description : " + desc+"</p>");
    res.write("<br><img src="+imgurl+">");
    res.send();
});
});
});

app.listen(3000,function(){
    console.log("SERVER running on port 3000!");
});

