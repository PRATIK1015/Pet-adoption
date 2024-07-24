import jwt from 'jsonwebtoken';

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const forgotPasswordTokenSecretKey =
	process.env.FORGOT_PASSWORD_TOKEN_SECRET_KEY;
const verificationTokenSecretKey =
	process.env.VERIFICATION_TOKEN_SECRET_KEY;

// Generate AccessToken
export const generateAccessToken = (payload: any) => {
	const token = jwt.sign(payload, accessTokenSecretKey as string, {
		expiresIn: 24 * 60 * 60, // in seconds,
	});

	return token;
};

// Generate Forgot Password Token
export const generateForgotPasswordToken = (payload: any) => {
	const token = jwt.sign(payload, forgotPasswordTokenSecretKey as string, {
		expiresIn: 24 * 60 * 60, // in seconds,
	});
	return token;
};

// Generate verification Token
export const generateVerificationToken = (payload: any) => {
	const token = jwt.sign(payload, verificationTokenSecretKey as string, {
		expiresIn: 24 * 60 * 60, // in seconds,
	});
	return token;
};

// Verify Access Token
export const verifyAccessToken = (accessToken: string) => {
	const verified = jwt.verify(accessToken, accessTokenSecretKey as string);

	return verified;
};

// Verify Forgot Password Token
export const verifyForgotPasswordToken = (forgotPasswordToken: any) => {
	const verified = jwt.verify(
		forgotPasswordToken,
		forgotPasswordTokenSecretKey as string
	);
	return verified;
};

// Verify Forgot Password Token
export const verifyVerificationToken = (verificationToken: any) => {
	const verified = jwt.verify(
		verificationToken,
		verificationTokenSecretKey as string
	);
	return verified;
};


export const isTokenExpired = (unixTimestamp: number) => {
	// Get the current time in seconds
	const currentTimestamp = Math.floor(Date.now() / 1000);

	// Compare the given Unix timestamp with the current timestamp
	return unixTimestamp <= currentTimestamp;
};