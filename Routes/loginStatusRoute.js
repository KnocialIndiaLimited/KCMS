const  express =require('express');
const router = express.Router();

var LoginStatusController =require('../controller/LoginStatusController');




router.post('/addStatus',LoginStatusController.addLoginStatus);
router.get('/getAllStatus',LoginStatusController.getAllLoginStatus);
router.get('/getUserStatus/:id',LoginStatusController.getAllLoginStatusById);
router.get('/getUserSingleStatus/:id',LoginStatusController.getPersonalLoginStatusById);
router.get('/getTotalActive/:id',LoginStatusController.getTotalActiveById);
router.put('/updateloginStatus/:id',LoginStatusController.updateLoginStatus);

module.exports=router;