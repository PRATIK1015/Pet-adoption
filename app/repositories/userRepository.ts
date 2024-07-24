import { prisma } from '../client/prisma';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';

const getActiveUserById = async (id: string) => {
	const user = await prisma.user.findFirst({
		where: {
			id
		}
	});
	return user;
};

const getUserByEmail = async (email: string) => {
	const user = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});
	return user;
};

const validateUser = async (companyId: string) => {
	const user = await getActiveUserById(companyId);
	if (!user) {
		throw new ApiException(ErrorCodes.INVALID_USER_ID);
	}
};


const getUserById = async (id: string) => {
	const user = await prisma.user.findFirst({
		where: {
			id
		},
	});
	return user;
};

const getAllUserBy = async () => {
	const users = await prisma.user.findMany({});
	return users;
};

const createUser = async (data: {
	role: 'SUPERADMIN' | 'ADMIN' | 'USER';
	name: string;
	password: string;
	email: string
}) => {
	const user = await prisma.user.create({
		data: data
	});
	return user;
};

const updateUserById = async (data: {
	role: 'SUPERADMIN' | 'ADMIN' | 'USER';
	name: string;
	updateUserId: string
}) => {
	const { role, updateUserId,name}=data
	const user = await prisma.user.updateMany({
		where: {
			id: updateUserId
		},
		data:{
			role:role,
			name:name
		}
	});
	return user;
};


export const userRepository = {
	getActiveUserById,
	getUserByEmail,
	validateUser,
	getUserById,
	createUser,
	updateUserById,
	getAllUserBy
};
