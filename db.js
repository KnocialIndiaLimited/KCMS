const mongoose =require('mongoose');
mongoose.set('strictQuery', false);
//mongodb+srv://ramangroverind:Akashraman@cluster0.xykllbe.mongodb.net/knocial_india?retryWrites=true&w=majority
// mongodb+srv://ramangroverind:Akashraman@cluster0.xykllbe.mongodb.net/knocial_india?retryWrites=true&w=majority
//mongodb+srv://akashdagur:mMg0AbF7x3GHpMM6@cluster0.en8s94w.mongodb.net/knocial_india?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://ramangroverind:Akashraman@cluster0.xykllbe.mongodb.net/knocial_india?retryWrites=true&w=majority',(err)=>{
    if(!err){
      
        // console.log(db);
        console.log("Database connect sucessfully")
        // docs.collection("users").find({username:'om'}).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     docs.close();
        //   });
        
    }
    else{
        console.log(err);
    }
})
module.exports=mongoose;