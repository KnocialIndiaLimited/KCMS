var {Event}=require('../module/event');
const counterSchema=require('../module/counter');
const datezone=require('../dateZone')

const addEvent=(req,res)=>{
    counterSchema.findOneAndUpdate(
        {id:"event_seq"},
        {"$inc":{"seq":1} },{new:true},
        (err,cd)=>{
            let seqId;
            if(cd==null){
                const newval =new counterSchema({id:"event_seq",seq:1});
                newval.save();
                seqId=1;
            }
            else{
                seqId=cd.seq;
            }
            var event= new Event({
                _id:seqId,
                title:req.body.title,
                event_description:req.body.event_description,
                event_date:req.body.event_date,
                event_time:req.body.event_time,
                created_by:req.body.created_by,
                created_at:datezone.datezone
            });
            event.save((err,docs)=>{
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

const getAllEvent=(req,res)=>{
    Event.find((err,docs)=>{
        if(!err){
            res.json(docs);
        }
        else{
            res.json(err)
        }
    })
}


const deleteEvent= (req,res)=>{
    var deleteid=req.params.id;
    Event.findByIdAndDelete(deleteid,(err,del)=>{
        if(!err){
            res.json(del);
        }
        else{
            res.json(err);
        }
    })
}



module.exports={addEvent,getAllEvent,deleteEvent}