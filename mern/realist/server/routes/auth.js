import express from 'express';

import * as authController from '../controllers/auth.js';

const router = express.Router();

// get post put delete
router.get('/', authController.welcome);

export default router;
