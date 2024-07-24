import { prisma } from '../client/prisma';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';


const validatePet = async (companyId: string) => {
	const pet = await getPetById(companyId);
	if (!pet) {
		throw new ApiException(ErrorCodes.INVALID_PET_ID);
	}
	return pet
};


const getPetById = async (id: string) => {
	const pet = await prisma.pet.findFirst({
		where: {
			id
		},
	});
	return pet;
};

const createPet = async (data: {
	name: string;
	age: number;
	description: string;
	species: string;
	ownerId: string
}) => {
	const { species, description, age, name, ownerId } = data
	const user = await prisma.pet.create({
		data: {
			name,
			age,
			species,
			description,
			adoptedById: ownerId,
			createdById: ownerId,
		}
	});
	return user;
};

const getAllPets=async (data:{
	name: string;
	species: string;
})=>{
	const {name,species}=data
	const pets = await prisma.pet.findMany({
		where: {
			...(name && { name: { contains: name as string, mode: 'insensitive' } }),
			...(species && { species: { contains: species as string, mode: 'insensitive' } }),
		},
	});
	return pets
}

const changePetOwener = async (data:{petId: string,newOwenerId:string}) => {
	const {petId,newOwenerId}=data
	const pet = await prisma.pet.update({
		where: {
			id:petId
		},
		data:{
			adoptedById:newOwenerId
		}
	});
	return pet;
};



export const petRepository = {
	validatePet,
	getPetById,
	createPet,
	getAllPets,
	changePetOwener

};
