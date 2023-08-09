var {LoginStatus}=require('../module/LoginStatus');
const counterSchema=require('../module/counter');
const dateZone=require('../dateZone');
const moment = require('moment');
const convert = require('../Converttime');

var data1;
const addLoginStatus=(rpt_id,name,date,loginTime,ipAddress)=>{

LoginStatus.findOne({rpt_id:rpt_id,date:dateZone.datezone}).then(User=>{

        // console.log(User.shift[0].shift_start)
        if(User){
        // getData('next shift')
        }
        else{
            counterSchema.findOneAndUpdate(
                {id:"loginStatus_seq"},
                {"$inc":{"seq":1} },{new:true},
                (err,cd)=>{
                    let seqId;
                    if(cd==null){
                        const newval =new counterSchema({id:"loginStatus_seq",seq:1});
                        newval.save();
                        seqId=1;
                    }
                    else{
                        seqId=cd.seq;
                    }
                    var loginstatus= new LoginStatus({
                        _id:seqId,
                        rpt_id:rpt_id,
                        name:name,
                        date:date,
                        loginTime:loginTime,
                        ipAddress:ipAddress,
                        created_at:dateZone.datezone
                    });
                    loginstatus.save((err,docs)=>{
                        if(!err){
                          console.log(docs)
                        }
                        else{
                       console.log(err)        
                }
                    });
                }
            )  
              }       
    })

}



const getAllLoginStatus=(req,res)=>{
    LoginStatus.find((err,docs)=>{
        if(!err){
            res.json(docs);
        }
        else{
            res.json(err)
        }
    })
}

const getAllLoginStatusById=(req,res)=>{
    const getId=req.params.id;
    var data;
    var array=[];
    LoginStatus.find({rpt_id:getId},(err,docs)=>{
        if(!err){
            docs.map(x=>{
                var colorData;
                var text;
            if(x.totalActive){
                if(x.totalActive<14400){
                x.name='A  ('+convert(x.totalActive)+')'
                colorData='#FF0000'
                }
                else if(x.totalActive>=14400 && x.totalActive<25200){
                x.name='P/2  ('+convert(x.totalActive)+')'
                colorData='#FFFF00'
                text='#000000'
                }
                else if(x.totalActive>=25200 && x.totalActive<28800){
                x.name='P/3  ('+convert(x.totalActive)+')'
                colorData='#FFC0CB'
                text='#FF0000'
                }
                else{
                    x.name='P  ('+convert(x.totalActive)+')'
                    colorData='#00FF00'
                     text='#FF0000'
                }
            }
            else{
                x.name='A'
                colorData='#FF0000'
            }
                x.date=moment(x.date).format('YYYY-MM-DD')
                data={
                    title:x.name,
                    date:x.date,
                    color:colorData,
                    textColor:text,
                    display:'block'
                    
                }
                array.push(data)
            })
            res.json(array)
        //   var date=moment(docs.date).format('YYYY-MM-DD')
        //    data={
        //     title:docs.name,
        //     date:date,
        //     color:'6598'
        //    }
        //    console.log(docs)
        }
        else{
            res.json(err)
        }
    })
}


const getPersonalLoginStatusById=(req,res)=>{
    const getId=req.params.id;
    var array=[];
    LoginStatus.find({rpt_id:getId},(err,docs)=>{
        if(!err){
            docs.map(x=>{
                x.totalActive=convert(x.totalActive)
            })
            res.json(docs)        
        }
        else{
            res.json(err)
        }
    })
}


const getTotalActiveById=(req,res)=>{
    const getId=req.params.id;
    var array=[];
    LoginStatus.find({rpt_id:getId},(err,docs)=>{
        if(!err){
            res.json(docs)        
        }
        else{
            res.json(err)
        }
    })
}

const deleteLoginStatus= (req,res)=>{
    var deleteid=req.params.id;
    LoginStatus.findByIdAndDelete(deleteid,(err,del)=>{
        if(!err){
            res.json(del);
        }
        else{
            res.json(err);
        }
    })
}

const updateLoginStatus=(req,res)=>{
    const getId=req.params.id;
    var getcurentdate=new Date();
    var dateUTC = getcurentdate.getTime() 
    var dateIST = new Date(dateUTC);
    const getDate=moment(dateIST).format('YYYY/MM/DD');

    dateIST.setHours(dateIST.getHours()); 
    dateIST.setMinutes(dateIST.getMinutes());

console.log(req.body.totalActive)
    LoginStatus.findOneAndUpdate({rpt_id:getId,date:getDate},
        {
        lastActive:dateZone.datezone, 
        totalActive:req.body.totalActive,
        logout:req.body.logout,
        break1DateTime:req.body.break1DateTime,
        break2DateTime:req.body.break2DateTime,
        break3DateTime:req.body.break3DateTime,
        totalIdle:req.body.totalIdle,
    },
    (err,docs)=>{
        if(!err){
            res.json(docs)
        }
        else{
            res.json(err)
        }
    })
}

// const updateLoginStatus=(req,res)=>{
//     console.log(req.params.id)
//     LoginStatus.findOneAndUpdate({rpt_id:req.params.id},(err,result)=>{
//         console.log(result)
//     }
        //{
    //       logout:req.body.logout,
    //             break1DateTime:req.body.break1DateTime,
    //             break2DateTime:req.body.break2DateTime,
    //             break3DateTime:req.body.break3DateTime,
    //     lastActive:req.body.lastActive, 
    //     totalActive:req.body.totalActive,
    //     totalIdle:req.body.totalIdle,
    //     ActivityData:[],
    //     updated_at:Date.now()
    // },(docs,err)=>{
    //     if(!err){
    //         res.json(docs);
    //     }
    //     else{
    //         res.json(err);
    //     }
    //}
    
//}

module.exports={addLoginStatus,getAllLoginStatus,getAllLoginStatusById,deleteLoginStatus,updateLoginStatus,getPersonalLoginStatusById,getTotalActiveById}