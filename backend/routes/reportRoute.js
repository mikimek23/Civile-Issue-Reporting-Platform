const express=require('express')
const router=express.Router()
const reportController=require('../controllers/reportController');
const {authMiddleware}  = require('../middleware/authMiddleware');

router.post('/',authMiddleware,reportController.report);
router.get('/issues',authMiddleware,reportController.issues);
router.get('/all-reports',authMiddleware,reportController.reports);
router.put('/updateIssue:id',authMiddleware,reportController.updateIssue);
router.put('/deleteIssue/:id',authMiddleware,reportController.deleteIssue);

module.exports = router