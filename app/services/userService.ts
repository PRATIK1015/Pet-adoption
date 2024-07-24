
import { hashPassword } from '../helpers/passwordHelper';
import { User } from '../interfaces/global';
import { userRepository } from '../repositories/userRepository';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';

const createUserService = async (data: {
	role: 'ADMIN' | 'USER';
	name: string;
	password: string;
	email: string
}) => {
	const userData = data

	const encryptPass = await hashPassword(userData.password)

	userData.password = encryptPass;

	const userExists = await userRepository.getUserByEmail(userData?.email.toLocaleLowerCase())

	if (userExists) {
		throw new ApiException(ErrorCodes.USER_ALREADY_EXISTS);
	}
	await userRepository.createUser(userData)

	return {
		message: 'User Register successful.',
	};

}

const updateUserService = async (data: {
	user: User;
	updateUserId: string;
	role: 'SUPERADMIN' | 'ADMIN' | 'USER';
	name: string;
}) => {
	const { user, updateUserId, role, name } = data;


	const _user = await userRepository.getUserById(updateUserId);

	const loggedinUser = await userRepository.getUserById(user.id);

	if (loggedinUser?.role !== 'SUPERADMIN') {
		throw new ApiException(ErrorCodes.SUPERADMIN_UNAUTHORIZED)
	}

	if (!_user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND)
	}
	await userRepository.updateUserById({ updateUserId, role, name });

	return {
		message: 'User updated successfully',
	};
};

const getAllUserService = async (data: {
	user: User
}) => {

	const loggedInUser = await userRepository.getUserById(data?.user?.id)

	if (loggedInUser?.role === "SUPERADMIN") {
		throw new ApiException(ErrorCodes.SUPERADMIN_UNAUTHORIZED)

	}

	const users = await userRepository.getAllUserBy();

	const usersList = users.map(user => {
		return {
			id: user?.id,
			name: user?.name,
			email: user?.email,
			role: user?.role
		}
	})

	return {
		data: usersList,
		message: 'Fetch users successfully',
	};
};



export const userService = {
	updateUserService,
	createUserService,
	getAllUserService
};
