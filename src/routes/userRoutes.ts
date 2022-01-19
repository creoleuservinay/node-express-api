import express from 'express';
import authController from '../controllers/authController';
const router = express.Router();

router.post('/singup', authController.authController.singUp);
router.post('/login', authController.authController.loggingIn);

// router.route('/')
//   .get(userAuth.login)
//   .post(userAuth.SingUp);

// // router
// //   .route('/:id')
// //   .get(userAuth.getTour)
// //   .patch(userAuth.updateTour)
//   .delete(userAuth.deleteTour);
  

module.exports = router;