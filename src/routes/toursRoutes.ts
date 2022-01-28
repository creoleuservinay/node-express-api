import express from 'express';
import tourController from '../controllers/toursController';
import authController from '../controllers/authController';
import toursController from '../controllers/toursController';
const router = express.Router();

router.get('/import',authController.authController.protect, toursController.tourcontroller.importTour);
router.route('/')
  .get(authController.authController.protect, tourController.tourcontroller.getAllTours)
  .post(authController.authController.protect,tourController.tourcontroller.createTour);

router
  .route('/:id')
  .get(tourController.tourcontroller.getTour)
  .patch(tourController.tourcontroller.updateTour)
  .delete(authController.authController.protect, tourController.tourcontroller.deleteTour);
  

module.exports = router;