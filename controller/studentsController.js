var {Students}=require('../module/student');
const counterSchema=require('../module/counter');



const addStudents=(req,res)=>{
    var req=req.body;
    var adhar=req.aadhar_number;
    console.log(adhar);
    Students.findOne({aadhar_number:adhar}).then(data=>{
        if(data==null){
            counterSchema.findOneAndUpdate(
                {id:"students_seq"},
                {"$inc":{"seq":1} },{new:true},
                (err,cd)=>{
                    let seqId;
                    if(cd==null){
                        const newval =new counterSchema({id:"students_seq",seq:1});
                        newval.save();
                        seqId=1;
                    }
                    else{
                        seqId=cd.seq;
                    }
                    var students= new Students({
                        _id:seqId,
                        drv_id:req.drv_id,
                        clg_id:req.clg_id,
                        clg_name:req.clg_name,
                        category:req.category,
                        type:req.type,
                        drive_type:req.drive_type,
                        aadhar_number:req.aadhar_number,
                        name:req.name,
                        sex:req.sex,
                        qualification:req.qualification,
                        stream:req.stream,
                        package:req.package,
                        contact_no1:req.contact_no1,
                        contact_no2:req.contact_no2,
                        refrence_contact:req.refrence_contact,
                        refrence_name:req.refrence_name,
                        status:req.status,

                        college_name:req.college_name,
                        college_city:req.college_city,
                        college_state:req.college_state,
                        college_pin_code:req.college_pin_code,
                        college_type:req.college_type,

                        hr_remarks:req.hr_remarks,
                        created_by:req.created_by,
                        created_at:Date.now()
                    });
                    students.save((err,docs)=>{
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
        else{
                res.json({
                    message:"Student already Saved"
                })
        }
    })
    
        }

const getAllStudents=(req,res)=>{    
    Students.find((err,docs)=>{
        if(!err){
            res.json(docs);
        
        }
        else{
            res.json(err)
        }
    })
}


const deleteStudents= (req,res)=>{
    var deleteid=req.params.id;
    Students.findByIdAndDelete(deleteid,(err,del)=>{
        if(!err){
            res.json(del);
        }
        else{
            res.json(err);
        }
    })
}

const updateStudents=(req,res)=>{
    var req1=req.body;   
        Students.findByIdAndUpdate(req.params.id,{
            aadhar_number:req1.aadhar_number,
            name:req1.name,
            sex:req1.sex,
            qualification:req1.qualification,
            stream:req1.stream,
            package:req1.package,
            contact_no1:req1.contact_no1,
            contact_no2:req1.contact_no2,
            status:req1.status,
            refrence_contact:req.refrence_contact,
            refrence_name:req.refrence_name,
            hr_remarks:req1.hr_remarks,
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
   





module.exports={addStudents,getAllStudents,deleteStudents,updateStudents}