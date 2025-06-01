import { Router } from 'express';
import { getProjectsBatched } from '../controller/project';

const router = Router();

// Route to get batched projects with pagination
router.get('/projects', getProjectsBatched);

export default router;