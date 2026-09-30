import { Router } from 'express';
import { authenticate } from './../middlewares/auth.middleware.js';

const router = Router();

router.post('/',authenticate,cartValidator,)

export default router;