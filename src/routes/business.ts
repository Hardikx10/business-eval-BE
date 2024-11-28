import express from 'express';
import { createBusiness, deleteBusiness, getAllBusiness, getBusinessById, updateBusiness, uploadFiles } from '../controllers/business';
import multer from 'multer';
import { isAuthenticated } from '../middleware/auth';
import validate from '../middleware/validate';
import { createBusinessValidator, updateBusinessValidator } from '../validators/business';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/', validate(createBusinessValidator), createBusiness);
router.put('/:id', validate(updateBusinessValidator), updateBusiness);
router.get('/:id', isAuthenticated,getBusinessById);
router.get('/',isAuthenticated,getAllBusiness)
router.delete('/:id', isAuthenticated, deleteBusiness);
router.post('/upload/:id', upload.single('file') ,uploadFiles)

export default router;