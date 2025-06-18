import { Router } from 'express';
import { adminLogin } from '../controller/auth';

const router = Router();

router.post('/login', adminLogin);

export default router;