import { prisma } from '../client/prisma';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';


const getPetAdoptionReqById = async (id: string) => {
	const adoptionRequest = await prisma.adoptionRequest.findFirst({
		where: {
			id
		},
	});
	return adoptionRequest;
};

const ValidateAdoptionReq = async (reqId: string) => {
	const adoptionReq = await getPetAdoptionReqById(reqId)
	if (!adoptionReq) {
		throw new ApiException(ErrorCodes.INVALID_ADOPTION_REQ_ID)
	}
	return adoptionReq

}
const createAdoptionRequest = async (data: {
	petId: string;
	adopterId: string
}) => {
	const { petId, adopterId } = data
	const adoptionRequest = await prisma.adoptionRequest.create({
		data: {
			petId,
			userId: adopterId
		}
	});
	return adoptionRequest;
};

const getAdoptionRequest = async (data: {
	status: 'PENDING' | 'REJECTED' | 'APPROVED'
}) => {
	const { status } = data
	const adoptionRequests = await prisma.adoptionRequest.findMany({
		where: {
			...(status && { status: status as 'PENDING' | 'REJECTED' | 'APPROVED' }),
		},
		include: {
			pet: true,
			user: true,
		},
	});
	return adoptionRequests;
};

const updateAdoptionRequest = async (data: {
	status: 'REJECTED' | 'APPROVED';
	reqId: string
}) => {
	const { status, reqId } = data
	const adoptionRequest = await prisma.adoptionRequest.updateMany({
		where:{
			id:reqId
		},
		data: {
			status
		}
	});
	return adoptionRequest;
};

const checkAdoptionRequestAlreadyExtits = async (data: {
	adopterId: string;
	petId: string
}) => {
	const { adopterId, petId } = data
	const adoptionRequest = await prisma.adoptionRequest.findMany({
		where: {
			petId: petId,
			userId:adopterId,
			status:'PENDING'

		}
	});
	if (adoptionRequest){
		throw new ApiException(ErrorCodes.ADOPTION_REQ_ALREADY_PRESENT)
	}
	return adoptionRequest;
};


export const adoptionRepository = {
	createAdoptionRequest,
	getPetAdoptionReqById,
	getAdoptionRequest,
	ValidateAdoptionReq,
	updateAdoptionRequest,
	checkAdoptionRequestAlreadyExtits
};
