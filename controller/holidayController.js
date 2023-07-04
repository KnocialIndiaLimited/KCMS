var {Holiday}=require('../module/holiday');
const counterSchema=require('../module/counter');
const datezone=require('../dateZone')

const addHolidays=(req,res)=>{
    counterSchema.findOneAndUpdate(
        {id:"holidays_seq"},
        {"$inc":{"seq":1} },{new:true},
        (err,cd)=>{
            let seqId;
            if(cd==null){
                const newval =new counterSchema({id:"holidays_seq",seq:1});
                newval.save();
                seqId=1;
            }
            else{
                seqId=cd.seq;
            }
            var holiday= new Holiday({
                _id:seqId,
                title:req.body.title,
                holiday_description:req.body.holiday_description,
                holiday_from:req.body.holiday_from,
                holiday_to:req.body.holiday_to,
                created_by:req.body.created_by,
                created_at:datezone.datezone
            });
            holiday.save((err,docs)=>{
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

const getAllHoliday=(req,res)=>{
    Holiday.find((err,docs)=>{
        if(!err){
            res.json(docs);
        }
        else{
            res.json(err)
        }
    })
}


const deleteHoliday= (req,res)=>{
    var deleteid=req.params.id;
    Holiday.findByIdAndDelete(deleteid,(err,del)=>{
        if(!err){
            res.json(del);
        }
        else{
            res.json(err);
        }
    })
}



module.exports={addHolidays,getAllHoliday,deleteHoliday}