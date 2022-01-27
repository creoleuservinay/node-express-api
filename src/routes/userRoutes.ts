import express from 'express';
import authController from '../controllers/authController';
const router = express.Router();

router.post('/singup', authController.authController.singUp);
router.post('/login', authController.authController.loggingIn);
router.get('/logout', authController.authController.logOut);
router.get('/all', authController.authController.getUsers);

module.exports = router;