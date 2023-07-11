var {Colleges}=require('../module/colleges');
const counterSchema=require('../module/counter');



const addColleges=(req,res)=>{
    var req=req.body;
    var statusClg;
    if(req.tnp_head_name=='' || req.tnp_head_name===undefined || req.tnp_head_contact=='' || req.tnp_head_contact===undefined || req.tnp_head_email=='' ||req.tnp_head_email===undefined){
        statusClg=1;
    }
    else{
        statusClg=2
    }
    counterSchema.findOneAndUpdate(
        {id:"colleges_seq"},
        {"$inc":{"seq":1} },{new:true},
        (err,cd)=>{
            let seqId;
            if(cd==null){
                const newval =new counterSchema({id:"colleges_seq",seq:1});
                newval.save();
                seqId=1;
            }
            else{
                seqId=cd.seq;
            }
            var colleges= new Colleges({
                _id:seqId,
                college_name:req.college_name,
                college_city:req.college_city,
                college_state:req.college_state,
                college_pin_code:req.college_pin_code,
                college_type:req.college_type,
                tnp_head_name:req.tnp_head_name,
                tnp_head_contact:req.tnp_head_contact,
                tnp_head_email:req.tnp_head_email,
                status:statusClg,
                created_by:req.created_by,
                created_at:Date.now()
            });
            colleges.save((err,docs)=>{
                if(!err){
                    res.json(docs);
                }
                else{
                    res.json(err);
                }
            });
        }
    )
        }

const getAllColleges=(req,res)=>{    
    Colleges.find((err,docs)=>{
        if(!err){
            res.json(docs);
        
        }
        else{
            res.json(err)
        }
    })
}


const deleteColleges= (req,res)=>{
    var deleteid=req.params.id;
    Colleges.findByIdAndDelete(deleteid,(err,del)=>{
        if(!err){
            res.json(del);
        }
        else{
            res.json(err);
        }
    })
}

const updateColleges=(req,res)=>{
    var req1=req.body;   
        Colleges.findByIdAndUpdate(req.params.id,{
            college_name:req1.college_name,
            college_city:req1.college_city,
            college_state:req1.college_state,
            college_pin_code:req1.college_pin_code,
            college_type:req1.college_type,
            tnp_head_name:req1.tnp_head_name,
            tnp_head_contact:req1.tnp_head_contact,
            tnp_head_email:req1.tnp_head_email,
            updated_by:req1.created_by,
            updated_at:Date.now()
        },(docs,err)=>{
            if(!err){
                res.json(docs);
            }
            else{
                res.json(err);
            }
        })
    }
   

const addPanel=(req,res)=>{
    var req1=req.body;   
    Colleges.findByIdAndUpdate(req.params.id,{
        tnp_head_name:req1.tnp_head_name,
        tnp_head_contact:req1.tnp_head_contact,
        tnp_head_email:req1.tnp_head_email,
        college_city:req1.college_city,
        status:2,
    },(docs,err)=>{
        if(!err){
            res.json(docs);
        }
        else{
            res.json(err);
        }
    })
}



module.exports={addColleges,getAllColleges,deleteColleges,updateColleges,addPanel}