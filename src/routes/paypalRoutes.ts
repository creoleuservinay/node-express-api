import express from 'express';
import paymentController from  '../controllers/paymentsController';
const router = express.Router();



router.route('/').post(paymentController.paymentRouteManage.createPayment);



module.exports = router;