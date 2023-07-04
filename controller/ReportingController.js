var {Reporting}=require('../module/reporting');
const counterSchema=require('../module/counter');
var {Students}=require('../module/student');
var timeZone=require('../dateZone');

const validate=(req,res)=>{
    var req=req.body;
    var adhar=req.aadhar_number;
    Students.findOne({aadhar_number:adhar}).then(data=>{
        if(data==null){
            res.json({
                message:"Student Not Found"
            })
        }
        else{
          res.json(data);
        }
    })
        }

const addReporting=(req,res)=>{
    var req=req.body;
    const adhar=req.aadhar_number;
    Reporting.findOne({aadhar_number:adhar}).then(data=>{
        if(!data){
            counterSchema.findOneAndUpdate(
                {id:"reporting_seq"},
                {"$inc":{"seq":1} },{new:true},
                (err,cd)=>{
                    let seqId;
                    if(cd==null){
                        const newval =new counterSchema({id:"reporting_seq",seq:1});
                        newval.save();
                        seqId=1;
                    }
                    else{
                        seqId=cd.seq;
                    }
                    var reporting= new Reporting({
                        _id:seqId,
                        aadhar_number:req.aadhar_number,
                        employee_type:req.employee_type,
                        total_vsr:req.total_vsr,
                        paid_vsr:req.paid_vsr,
                        fine:req.fine,
                        other:req.other,
                        paid_fine:req.paid_fine,
                        paid_other:req.paid_other,
                        fineWaiver:req.fineWaiver,
                        otherWaiver:req.otherWaiver,
                        vsrWaiver:req.vsrWaiver,
                        pending_value:req.total_vsr,
                        total_value:req.total_vsr,
                        selection_type:req.selection_type,
                        reported_at:req.reported_at,
                        batch_starting_date:req.batch_starting_date,
                        employee_name:req.employee_name,
                        father_name:req.father_name,
                        mother_name:req.mother_name,
                        package:req.package,
                        gender:req.gender,
                        blood_group:req.blood_group,
                        contact_no1:req.contact_no1,
                        contact_no2:req.contact_no2,
                        dob:req.dob,
                        address:req.address,
                        email:req.email,
                        identity_mark:req.identity_mark,
                        maritial_status:req.maritial_status,
                        designation:req.designation,
                        department:req.department,
                        subDepartment:req.subDepartment,
                        nationality:req.nationality,
                        religion:req.religion,
                        select_batch:req.select_batch,
                        college_name:req.college_name,
                        college_city:req.college_city,
                        college_state:req.college_state,
                        qualification:req.qualification,
                        stream:req.stream,
                        financial_year:req.financial_year,
                        offer_letter_account:req.offer_letter_account,
                        band:req.band,
                        offer_letter_date:req.offer_letter_date,
                        status:req.status,
                        reported_by:req.reported_by,
                        created_by:req.created_by,
                        created_at:timeZone.datezone
                    });
                    reporting.save((err,docs)=>{
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
                message:'Reporting Exist'
            })
        }
    })
        }

const getAllReporting=(req,res)=>{    
    Reporting.find((err,docs)=>{
        if(!err){
            res.json(docs);
        
        }
        else{
            res.json(err)
        }
    })
}

const getReportingById=(req,res)=>{  
    var id=req.params.id;  
    Reporting.findOne({_id:id},(err,docs)=>{
        if(!err){
            res.json(docs);
        }
        else{
            res.json(err)
        }
    })
}


const deleteReporting= (req,res)=>{
    var deleteid=req.params.id;
    Reporting.findByIdAndDelete(deleteid,(err,del)=>{
        if(!err){
            res.json(del);
        }
        else{
            res.json(err);
        }
    })
}

const updateReporting=(req,res)=>{
    var req1=req.body;   
        Reporting.findByIdAndUpdate(req.params.id,{
            aadhar_number:req1.aadhar_number,
            employee_type:req1.employee_type,
            selection_type:req1.selection_type,
            reported_at:req1.reported_at,
            batch_starting_date:req1.batch_starting_date,
            employee_name:req1.employee_name,
            father_name:req1.father_name,
            mother_name:req1.mother_name,
            gender:req1.gender,
            blood_group:req1.blood_group,
            contact_no1:req1.contact_no1,
            contact_no2:req1.contact_no2,
            dob:req1.dob,
            address:req1.address,
            email:req1.email,
            identity_mark:req1.identity_mark,
            maritial_status:req1.maritial_status,
            designation:req1.designation,
            department:req1.department,
            subDepartment:req1.subDepartment,
            nationality:req1.nationality,
            religion:req1.religion,
            select_batch:req1.select_batch,
            college_name:req1.college_name,
            college_city:req1.college_city,
            college_state:req1.college_state,
            qualification:req1.qualification,
            stream:req1.stream,
            financial_year:req1.financial_year,
            offer_letter_account:req1.offer_letter_account,
            band:req1.band,
            offer_letter_date:req1.offer_letter_date,
            reported_by:req1.reported_by,
            updated_by:req1.created_by,
            inTraining:req1.inTraining,
            completeTraining:req1.completeTraining,
            joined:req1.joined,
            left:req1.left,
            updated_at:Date.now(),
            updated_by:req1.created_by
        },(docs,err)=>{
            if(!err){
                res.json(docs);
            }
            else{
                res.json(err);
            }
        })
    }
   

    const updatePendingAmount=(req,res)=>{ 
            Reporting.findByIdAndUpdate(req.params.id,{
                pending_value:req.body.pending_value,
                paid_vsr:req.body.paid_vsr,
                fine:req.body.fine,
                paid_fine:req.body.paid_fine,
                paid_other:req.body.paid_other,
                total_value:req.body.total_value,
                fineWaiver:req.body.fineWaiver,
                vsrWaiver:req.body.vsrWaiver,     
                otherWaiver:req.body.otherWaiver,  
                other:req.body.other                           
            },(docs,err)=>{
                if(!err){
                    res.json(docs);
                }
                else{
                    res.json(err);
                }
            })
        }


        const updateJobstatus = (req,res)=>{
            console.log(req.body.message)
            if(req.body.message=='inTraining'){
                Reporting.findByIdAndUpdate(req.params.id,{
                    inTraining:{
                        batch_start:req.body.batch_start,
                        training_start:req.body.training_start,
                        address:req.body.address,
                        pan_card:req.body.pan_card,
                        name:req.body.name,
                        contact_number:req.body.contact_number,
                        relation:req.body.relation,
                        bank_name:req.body.bank_name,
                        ac_name:req.body.ac_name,
                        ac_number:req.body.ac_number,
                        ac_type:req.body.ac_type,
                        ifsc_code:req.body.ifsc_code,
                        micr_code:req.body.micr_code,
                        esic_number:req.body.esic_number,
                        epfo_number:req.body.epfo_number,
                        uan_number:req.body.uan_number,
                        hr_remarks:req.body.hr_remarks,
                        document_name:req.body.document_name,
                        file:req.body.file,
                        file_name:req.body.file_name,
                        file_status:req.body.file_status,
                        deadline:req.body.deadline,
                        doc_hr_remarks:req.body.doc_hr_remarks,
                        created_by:req.body.created_by,
                        created_at:timeZone.datezone
                    },
                    status:req.body.status
                },(docs,err)=>{
                    if(!err){
                        res.json(docs);
                    }
                    else{
                        res.json(err);
                    }
                })
            }
            else if(req.body.message=='trainingComplete'){
                Reporting.findByIdAndUpdate(req.params.id,{
                    completeTraining:{
                        batch_start:req.body.batch_start,
                        training_start:req.body.training_start,
                        training_complete:req.body.training_complete,
                        hr_remarks:req.body.hr_remarks,
                        created_by:req.body.created_by,
                        created_at:timeZone.datezone
                    },
                    status:req.body.status
                },(docs,err)=>{
                    if(!err){
                        res.json(docs);
                    }
                    else{
                        res.json(err);
                    }
                })
            }
            else if(req.body.message=='joined'){
                Reporting.findByIdAndUpdate(req.params.id,{
                    joined:{
                        batch_start:req.body.batch_start,
                        training_start:req.body.training_start,
                        training_complete:req.body.training_complete,
                        joining_date:req.body.joining_date,
                        hr_remarks:req.body.hr_remarks,
                        created_by:req.body.created_by,
                        created_at:timeZone.datezone,
                
                    },
                    status:req.body.status
                },(docs,err)=>{
                    if(!err){
                        res.json(docs);
                    }
                    else{
                        res.json(err);
                    }
                })
            }
            else{
                Reporting.findByIdAndUpdate(req.params.id,{
                    left:{
                        batch_start:req.body.batch_start,
                        training_start:req.body.training_start,
                        training_complete:req.body.training_complete,
                        joining_date:req.body.joining_date,
                        seperation_date:req.body.seperation_date,
                        seperation_type:req.body.seperation_type,
                        rejoining_possible:req.body.rejoining_possible,
                        hr_remarks:req.body.hr_remarks,
                        created_by:req.body.created_by,
                        created_at:timeZone.datezone,
                        failStatus:req.body.failStatus
                    },
                    status:req.body.status

                },(docs,err)=>{
                    if(!err){
                        res.json(docs);
                    }
                    else{
                        res.json(err);
                    }
                }) 
            }
   
        }



module.exports={addReporting,getAllReporting,deleteReporting,updateReporting,validate,updatePendingAmount,updateJobstatus,getReportingById}