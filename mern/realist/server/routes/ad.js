import express from 'express';

import * as adController from '../controllers/ad.js';
import { requireSignin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload-image', requireSignin, adController.uploadImage);

export default router;
