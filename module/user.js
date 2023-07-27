const mongoose = require('mongoose');
var user = mongoose.model("user",{
    _id:{type:Number},
    rpt_id:{type:Number},
    username:{type:String,min:5,max:10},
    email:{type:String},
    phone_no:{type:Number},
    profile:{type:String},
    password:{type:String,min:5},
    role:{type:Array},
    shift:{type:Array},
    department:{type:String},
    designation:{type:String},
    sub_department:{type:String},
    office_location:{type:Array},
    status:{type:Boolean}
}); 
module.exports={user};