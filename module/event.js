
const mongoose = require('mongoose');


const Event = mongoose.model("event",{
    _id:{type:Number,required:true},
    title:{type:String},
    event_description:{type:String},
    event_date:{type:String},
    event_time:{type:String},
    created_by:{type:String},
    created_at:{type:String},
    updated_by:{type:String},
    updated_at:{type:String}
})

module.exports={Event}