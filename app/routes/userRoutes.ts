import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware';
import asyncHandler from '../utils/async-handler';
import { userService } from '../services/userService';
import { RequestExtended } from '../interfaces/global';
import { updateUserValidationRules } from '../helpers/validators';

const router = express.Router();



router.put(
	'/update-user',
	isAuthenticated,
	updateUserValidationRules,
	asyncHandler(async (req: RequestExtended) => {
		const user = req.user;

		const data = {
			user: user,
			updateUserId: req.body.updateUserId,
			role: req.body.role,
			name: req.body.name,
		};

		return userService.updateUserService(data);
	})
);

router.get(
	'/',
	isAuthenticated,
	asyncHandler(async (req:RequestExtended) => {
		const data={
			user:req.user
		}

		return userService.getAllUserService(data);
	})
);


export default router;
