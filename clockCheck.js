const clockCheck=(seconds)=>{
    var val;
    if(seconds>=86400){
        val=seconds-86400
    }
    else{
        val=seconds
    }
    return val
    
    }
    module.exports=clockCheck