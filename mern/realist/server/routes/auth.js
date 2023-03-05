import express from 'express';

import * as authController from '../controllers/auth.js';
import { requireSignin } from '../middlewares/auth.js';

const router = express.Router();

// get post put delete
router.get('/', requireSignin, authController.welcome);
router.post('/pre-register', authController.preRegister); // 회원가입자 이메일 인증
router.post('/register', authController.register); // 회원가입
router.post('/login', authController.login); // 로그인
router.post('/forgot-password', authController.forgotPassword);
router.post('/access-account', authController.accessAccount);
router.get('/refresh-token', authController.refreshToken);
router.get('/current-user', requireSignin, authController.currentUser);
router.get('/profile/:username', authController.publicProfile);
router.put('/update-password', requireSignin, authController.updatePassword);
router.put('/update-profile', requireSignin, authController.updateProfile);

export default router;
