const mongoose =require('mongoose');

const LoginStatus = mongoose.model("loginStatus",{
    _id:{type:Number},
    rpt_id:{type:String},
    name:{type:String},
    date:{type:String},
    loginTime:{type:String},
    logout:{type:String},
    break1DateTime:{type:String},
    break2DateTime:{type:String},
    break3DateTime:{type:String},
    lastActive:{type:String}, 
    totalActive:{type:String},
    totalIdle:{type:String},
    ipAddress:{type:String},
    ActivityData:{type:Array},
    created_by:{type:String},
    created_at:{type:String},
    updated_by:{type:String},
    updated_at:{type:String}
});
module.exports={LoginStatus}