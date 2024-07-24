export const ErrorCodes = {
	INTERNAL_SERVER_ERROR: {
		status: 500,
		code: 100,
		message: 'Internal server error.',
	},
	UNAUTHORIZED: { status: 401, code: 101, message: 'Unauthorized.' },
	ADMIN_UNAUTHORIZED: {
		status: 401,
		code: 101,
		message: 'Unauthorized role.',
	},
	SUPERADMIN_UNAUTHORIZED: {
		status: 401,
		code: 101,
		message: 'Unauthorized role.',
	},
	BAD_REQUEST: { status: 400, code: 102, message: 'Bad request.' },
	REFRESH_VALIDITY_EXPIRED: {
		status: 401,
		code: 103,
		message: 'Refresh validity expired',
	},
	INVALID_CREDENTIALS: {
		status: 401,
		code: 104,
		message: 'Invalid credentials.',
	},

	GENERATE_BAD_REQUEST: (errorDescription: string) => {
		return { ...ErrorCodes.BAD_REQUEST, errorDescription };
	},

	MISSING_PERMISSION: {
		status: 403,
		code: 103,
		message: 'Missing permission.',
	},

	USER_ALREADY_EXISTS: {
		status: 409,
		code: 105,
		message: 'User with same email already there.',
	},

	ID_REQUIRED: { status: 400, code: 1000, message: 'Id is required.' },


	INVALID_ID: { status: 400, code: 1001, message: 'Invalid id.' },

	USER_NOT_FOUND: { status: 400, code: 1002, message: 'User not found.' },

	INVALID_USER_ID: { status: 400, code: 1004, message: 'Invalid user id.' },
	INVALID_PET_ID: { status: 400, code: 1004, message: 'Invalid pet id.' },

	INVALID_ADOPTION_REQ_ID: { status: 400, code: 1004, message: 'Invalid pet id.' },
	ADOPTION_REQ_ALREADY_PRESENT: { status: 400, code: 1004, message: 'Pet adoption request for this is already present.' },


	EXPIRED_TOKEN: { status: 400, code: 2001, message: 'Token has expired.' },

	INVALID_TOKEN: { status: 400, code: 2001, message: 'Invalid Token.' },
	INVALID_VALUE: { status: 400, code: 2002, message: 'Invalid value.' },
	SAME_OWENER: { status: 400, code: 2002, message: 'You alreay own this pet.' },

	INVALID_PASSWORD: {
		status: 400,
		code: 2002,
		message: 'New password can not be same as old password.',
	},

};


export const BaseResponse = (result: any) => {
	// console.log('object', result);
	return { ...result, responseStatus: 200 };
};
