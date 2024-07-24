import express from 'express';
import {
	loginValidationRules,
	registerValidationRules
} from '../helpers/validators';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { authService } from '../services/authService';
import asyncHandler from '../utils/async-handler';
import { userService } from '../services/userService';

const router = express.Router();

router.post(
	'/login',
	loginValidationRules,
	asyncHandler(async (req) => {
		return authService.loginService(req);
	})
);

router.post(
	'/logout',
	isAuthenticated,
	asyncHandler(async (req) => {
		return authService.logoutService(req);
	})
);

router.post(
	'/register',
	registerValidationRules,
	asyncHandler(async (req) => {

		const data: {
			role: 'ADMIN' | 'USER';
			name: string;
			password: string;
			email: string
		} = {
			email: req.body.email,
			password: req.body.password,
			role: req.body.role,
			name: req.body.name,
		};

		return userService.createUserService(data);
	})
);


export default router;
