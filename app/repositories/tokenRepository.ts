import { prisma } from '../client/prisma';


const getAccessTokenByUser = async (id: string) => {
	const token = await prisma.accessToken.findFirst({
		where: {
			userId: id,
		},
	});
	return token;
};

const deleteAccessTokenByUser = async (id: string) => {
	await prisma.accessToken.deleteMany({
		where: {
			userId: id,
		},
	});
};

const createAccessTokenByUser = async (id: string, token: string) => {
	await prisma.accessToken.create({
		data: {
			userId: id,
			token,
		},
	});
};


export const tokenRepository = {
	getAccessTokenByUser,
	deleteAccessTokenByUser,
	createAccessTokenByUser,
};
