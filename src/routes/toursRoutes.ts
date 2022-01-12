import express from 'express';
import tourController from '../controllers/toursController';
const router = express.Router();

router.route('/')
  .get(tourController.routeManager.getAllTours)
  .post(tourController.routeManager.createTour);

router
  .route('/:id')
  .get(tourController.routeManager.getTour)
  .patch(tourController.routeManager.updateTour)
  .delete(tourController.routeManager.deleteTour);
  

module.exports = router;