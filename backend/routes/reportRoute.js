const express=require('express')
const router=express.Router()
const reportController=require('../controllers/reportController');
const {authMiddleware}  = require('../middleware/authMiddleware');

router.post('/',authMiddleware,reportController.report);
router.get('/issues',authMiddleware,reportController.issues);
router.get('/all-reports',authMiddleware,reportController.reports);
router.put('/update/:id',authMiddleware,reportController.updateIssue);
router.delete('/delete/:id',authMiddleware,reportController.deleteIssue);

module.exports = router