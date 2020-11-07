const express = require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var query=req.body.cityName;
  var apiKey="d14aa9915e6b2863b8639fd3d2f73505";
  var units="metric";
  var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp=weatherData.main.temp;
      const des=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(icon);
      res.write("<p> The weather is "+des+"</p>");
      res.write("<h1> The temperature in "+req.body.cityName+" is "+temp+" degree celsius</h1>");
      res.write("<img src="+imgUrl+">");
      res.send();
    });
  });
})


// var query="London";
// var apiKey="d14aa9915e6b2863b8639fd3d2f73505";
// var units="metric";
// var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
// https.get(url,function(response){
//   console.log(response.statusCode);
//
//   response.on("data",function(data){
//     const weatherData = JSON.parse(data);
//     const temp=weatherData.main.temp;
//     const des=weatherData.weather[0].description;
//     const icon=weatherData.weather[0].icon;
//     const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
//     console.log(icon);
//     res.write("<p> The weather is "+des+"</p>");
//     res.write("<h1> The temperature in london is "+temp+" degree celsius</h1>");
//     res.write("<img src="+imgUrl+">");
//     res.send();
//   });
// });





app.listen(3000,function(){
  console.log("server started on port 3000");
});
