import { Request } from 'express';
import { comparePassword } from '../helpers/passwordHelper';
import {
	generateAccessToken
} from '../helpers/tokenHelper';
import { RequestExtended } from '../interfaces/global';

import { tokenRepository } from '../repositories/tokenRepository';
import { userRepository } from '../repositories/userRepository';

import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';


const loginService = async (req: Request) => {
	const { email, password } = req.body;

	const user = await userRepository.getUserByEmail(email);

	if (!user) {
		throw new ApiException(ErrorCodes.INVALID_CREDENTIALS);
	}

	// if (!user.isVerified) {
	// 	throw new ApiException(ErrorCodes.USER_NOT_VERIFIED);
	// }

	const isPasswordValid = await comparePassword(
		password,
		user.password as string
	);

	if (!isPasswordValid) {
		throw new ApiException(ErrorCodes.INVALID_CREDENTIALS);
	}

	const accessToken = await tokenRepository.getAccessTokenByUser(user.id);



	if (accessToken) {
		await tokenRepository.deleteAccessTokenByUser(user.id);
		const newAccessToken = generateAccessToken({
			id: user.id,
			email
		});
		await tokenRepository.createAccessTokenByUser(user.id, newAccessToken);

		return {
			accessToken: newAccessToken,
			alreadyLogin: true,
			message: 'Login successful.',
		};
	} else {
		const newAccessToken = generateAccessToken({
			id: user.id,
			email,
		});
		await tokenRepository.createAccessTokenByUser(user.id, newAccessToken);
		return {
			accessToken: newAccessToken,
			alreadyLogin: false,
			message: 'Login successful',
		};
	}
};

const logoutService = async (req: RequestExtended) => {
	const { id } = req.user;
	await tokenRepository.deleteAccessTokenByUser(id);
	return {
		message: 'Logout successful.',
	};
};

export const authService = {
	loginService,
	logoutService,
};
