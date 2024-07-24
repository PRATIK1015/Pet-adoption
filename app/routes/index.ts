import express from 'express';
import asyncHandler from '../utils/async-handler';
import { customError, notFound } from '../utils/errorHandler';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import petRoutes from './petRoutes'

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/user',userRoutes);
router.use('/api/pet', petRoutes);


router.use(
	'/test',
	asyncHandler(async () => {
		return {
			message: 'Hello from Pet Addoption',
		};
	})
);

router.use(notFound);
router.use(customError);

export default router;
