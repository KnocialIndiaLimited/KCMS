"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('./db'),
    Mongoose = _require.Mongoose;

var http = require('http');

var user = require('./auth'); // var category=require('./routing/categoryRouting/category-route');
// var product=require('./routing/categoryRouting/product-route');
// var addCart=require('./routing/categoryRouting/addCart-route');
// var order=require('./routing/categoryRouting/orders-route');


var hrManagement = require('./Routes/trainingRoute');

var setting = require('./Routes/settingRoute');

var reporting = require('./Routes/reportingRoute');

var meeting = require('./Routes/meetingRoute');

var cors = require('cors'); // const server=http.createServer((req,res)=>{
//     res.writeHead(200);
//     res.end("hello world")
// });


var app = express();
app.use(bodyParser.json()); //https://knocialindia-965e6.web.app

app.use(cors({
  origin: '*'
})); // const PORT =process.env.PORT || 3000;
// app.listen(PORT,()=>console.log("server is running on 3000"))

app.listen(3000, function () {
  return console.log("Server started at port 3000");
}); // var date=new Date();
// var hours1 = date.getHours();
// // current minutes
// var minutes1 = date.getMinutes();
// // current seconds
// var seconds1 = date.getSeconds();
// setInterval(()=>{
//     var date =new Date();
//     // current hours
//     var hours = date.getHours();
//     // current minutes
//     var minutes = date.getMinutes();
//     // current seconds
//     var seconds = date.getSeconds();
// //  total_hour=hours-hours1;
// //  total_minutes=minutes-minutes1;
// //  total_seconds=seconds-seconds1;
// //  var time=total_hour+':'+total_minutes+':'+total_seconds;
//  console.log(time)
// },5000);

app.use('/user', user);
app.use('/', meeting);
app.use('/', hrManagement);
app.use('/', setting);
app.use('/', reporting);