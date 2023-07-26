const  express =require('express');
const router = express.Router();
const multer=require('multer');
var finalName;
var storage=multer.diskStorage({
    destination:(req,res,cb)=>{
  cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        var time=new Date()
        time=time.getTime()
         finalName=time+file.originalname
        cb(null,finalName)
    }
})

var upload=multer({storage:storage}).array('userfiles',10);

router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json(err);
        }
        else if(err){
            return res.status(500).json(err);
        }
        let uploadedFiles=[]
        for(let item of req.files){
            uploadedFiles.push({filename:finalName})
        }

        res.json({progress:100,files:uploadedFiles})

    })

      
})




module.exports=router;