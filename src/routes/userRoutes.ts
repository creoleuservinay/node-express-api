import express from 'express';
import userAuth from '../controllers/authController';
const router = express.Router();

router.post('/singup', userAuth.singUp);

// router.route('/')
//   .get(userAuth.login)
//   .post(userAuth.SingUp);

// // router
// //   .route('/:id')
// //   .get(userAuth.getTour)
// //   .patch(userAuth.updateTour)
//   .delete(userAuth.deleteTour);
  

module.exports = router;