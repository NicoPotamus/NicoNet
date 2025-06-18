import { Router } from 'express';
import { getProjectsBatched, createProject, deleteProject } from '../controller/project';

const router = Router();

// Project routes with proper error handling
router.get('/', getProjectsBatched);

router.post('/', (req, res, next) => {
    Promise.resolve(createProject(req, res)).catch(next);
});

router.delete('/:id', (req, res, next) => {
    Promise.resolve(deleteProject(req, res)).catch(next);
});

export default router;