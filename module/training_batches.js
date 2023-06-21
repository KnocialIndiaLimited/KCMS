const mongoose = require('mongoose');


const Batches = mongoose.model("training_batches",{
    _id:{type:Number,required:true},
    batch_name:{type:String,required:true},
    batch_location:{type:String,required:true},
    batch_starting_date:{type:String,required:true},
    batch_size:{type:Number,required:true},
    batch_type:{type:String,required:true},
    batch_trainer:{type:String,required:true},
    created_by:{type:String},
    created_at:{type:Date},
    updated_by:{type:String},
    updated_at:{type:Date}


})

module.exports={Batches}