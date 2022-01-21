import express from 'express';
import tourController from '../controllers/toursController';
import authController from '../controllers/authController';
const router = express.Router();

router.route('/')
  .get(authController.authController.protect, tourController.routeManager.getAllTours)
  .post(tourController.routeManager.createTour);

router
  .route('/:id')
  .get(tourController.routeManager.getTour)
  .patch(tourController.routeManager.updateTour)
  .delete(authController.authController.protect, tourController.routeManager.deleteTour);
  

module.exports = router;