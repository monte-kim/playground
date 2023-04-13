import express from 'express';

import * as adController from '../controllers/ad.js';
import { requireSignin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload-image', requireSignin, adController.uploadImage);
router.post('/remove-image', requireSignin, adController.removeImage);
router.post('/ad', requireSignin, adController.create);
router.get('/ads', adController.ads);
router.get('/ad/:slug', adController.read);

router.post('/wishlist', requireSignin, adController.addToWishList);
router.delete(
  '/wishlist/:adId',
  requireSignin,
  adController.removeFromWishList,
);

export default router;
