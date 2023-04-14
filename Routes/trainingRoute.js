const  express =require('express');
const router = express.Router();
var training_batchesController =require('../controller/training_batchesController');

var collegeController =require('../controller/collegesController');
var driveController =require('../controller/driveController');

var studentsController =require('../controller/studentsController');


router.post('/training_batches',training_batchesController.addBatches);
router.get('/training_batches',training_batchesController.getAllBatches);
router.delete('/training_batches/:id',training_batchesController.deleteBatches);
router.put('/training_batches/:id',training_batchesController.updateBatches);


router.post('/colleges',collegeController.addColleges);
router.get('/colleges',collegeController.getAllColleges);
router.delete('/colleges/:id',collegeController.deleteColleges);
router.put('/colleges/:id',collegeController.updateColleges);
 router.put('/collegesStatus/:id',collegeController.addPanel);


 router.post('/drives',driveController.addDrives);
 router.get('/drives',driveController.getAllDrives);
 router.delete('/drives/:id',driveController.deleteDrives);
 router.put('/drives/:id',driveController.updateDrives);


 
 router.post('/students',studentsController.addStudents);
 router.get('/students',studentsController.getAllStudents);
 router.delete('/students/:id',studentsController.deleteStudents);
 router.put('/students/:id',studentsController.updateStudents);

module.exports=router;