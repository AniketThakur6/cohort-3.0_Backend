import { Router } from 'express';
import { authenticate } from './../middlewares/auth.middleware.js';
import { addToCart, getCart } from '../controllers/cart.controller.js';
import { cartValidator } from '../validators/cart.validator.js';

const router = Router();

router.post('/',authenticate,cartValidator,addToCart)

router.get('/',authenticate,getCart)

export default router;