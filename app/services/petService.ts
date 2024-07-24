import { User } from "../interfaces/global";
import { adoptionRepository } from "../repositories/petAdoptionRepository";
import { petRepository } from "../repositories/petRepository";
import { userRepository } from "../repositories/userRepository";
import ApiException from "../utils/errorHandler";
import { ErrorCodes } from "../utils/response";


const createPetService = async (data: {
	name: string;
	age: number;
	description: string;
	species: string
	user: User;
}) => {
	const { user, name, species, description, age } = data

	await petRepository.createPet({ age, name, description, species, ownerId: user?.id })


	return {
		message: 'Pet post created successful.',
	};

}

const getAllPetsService = async (data: {
	name: string;
	species: string
	user: User;
}) => {
	const { name, species } = data

	const pets= await petRepository.getAllPets({ name, species })

	const petsList=pets?.map(pet=>{
		return {
			id:pet.id,
			name:pet?.name,
			species:pet?.species,
			description:pet.description,
			petOwener:pet.adoptedById,
			age:pet?.age,
			createdBy:pet?.createdById
		}
	})


	return {
		data: petsList,
		message: 'Pets fetch successful.',
	};

}

const createPetAdoptionService = async (data: {
	petId: string
	user: User;
}) => {
	const { user, petId } = data

	const pet = await petRepository.validatePet(petId)


	await adoptionRepository.checkAdoptionRequestAlreadyExtits({ petId,adopterId:user.id})

	if (user.id === pet?.adoptedById) {
		throw new ApiException(ErrorCodes.SAME_OWENER)
	}
	await adoptionRepository.createAdoptionRequest({ petId, adopterId: user.id })


	return {
		message: 'Pet adoption request created successful.',
	};

}

const getAllPetAdoptionService = async (data: {
	status: 'PENDING' | 'REJECTED' | 'APPROVED'
	user: User;
}) => {
	const { status,user } = data

const loggedInUser=await userRepository.getUserById(user.id)

if(loggedInUser?.role !=="ADMIN" && loggedInUser?.role!=="SUPERADMIN"){
 throw new ApiException(ErrorCodes.MISSING_PERMISSION)
}

	const adoptionReqs = await adoptionRepository.getAdoptionRequest({status})

	const adoptionReqList = adoptionReqs.map(item=>{
		return {
			id:item.id,
			userId: item.userId,
			petId:item.petId,
			status:item.status,
			petCurrOwener: item?.pet?.adoptedById,
		}
	})

	return {
		data: adoptionReqList,
		message: 'Fetch all pets adoption request successful.',
	};

}

const updatePetAdoptionService = async (data: {
	status:  'REJECTED' | 'APPROVED';
	reqId:string;
	user: User;
}) => {
	const { status,reqId } = data

	const adoptionReq=await adoptionRepository.ValidateAdoptionReq(reqId)

	await adoptionRepository.updateAdoptionRequest({reqId,status})

	if(status==="APPROVED"){
		await petRepository.changePetOwener({ petId: adoptionReq.petId,newOwenerId:adoptionReq.userId })
	}


	return {
		message: 'Pet adoption request updated successful.',
	};

}


export const petService = {
	createPetService,
	getAllPetsService,
	createPetAdoptionService,
	getAllPetAdoptionService,
	updatePetAdoptionService
};
