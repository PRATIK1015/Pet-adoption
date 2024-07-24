import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware';
import asyncHandler from '../utils/async-handler';
import { RequestExtended, User } from '../interfaces/global';
import { adoptionValidationRules, ceatePetValidationRules, getAdoptionValidationRules, handleAdoptionValidationRules } from '../helpers/validators';
import { petService } from '../services/petService';

const router = express.Router();



router.post(
	'/',
	isAuthenticated,
	ceatePetValidationRules,
	asyncHandler(async (req: RequestExtended) => {
		const user = req.user;

		const data:{
			name: string;
			age: number;
			description: string;
			species: string
			user: User;
		} = {
			user: user,
			name: req.body.name,
			age: req.body.age,
			species: req.body.species,
			description: req.body.description
		};

		return petService.createPetService(data)
	})
);

router.get(
	'/',
	isAuthenticated,
	asyncHandler(async (req: RequestExtended) => {
		const user = req.user;

		const data: {
			name: string;
			species: string
			user: User;
		} = {
			user: user,
			name: req.query.name ? req.query.name as string : '',
			species: req.query.species ? req.query.species  as string : '',
		};

		return petService.getAllPetsService(data)
	})
);

router.post(
	'/adoption',
	isAuthenticated,
	adoptionValidationRules,
	asyncHandler(async (req: RequestExtended) => {
		const user = req.user;

		const data: {
			petId:string
			user: User;
		} = {
			user: user,
			petId:req.body.petId
		};

		return petService.createPetAdoptionService(data)
	})
);


router.get(
	'/adoption',
	isAuthenticated,
	getAdoptionValidationRules,
	asyncHandler(async (req: RequestExtended) => {
		const user = req.user;
		const data: {
			status: 'PENDING' | 'REJECTED' | 'APPROVED';
			user: User;
		} = {
			user: user,
			status: req.query.status ? req.query.status as 'PENDING' | 'REJECTED' | 'APPROVED' : 'PENDING',
		};

		return petService.getAllPetAdoptionService(data)
	})
);

router.post(
	'/handle-adoption',
	isAuthenticated,
handleAdoptionValidationRules,
	asyncHandler(async (req: RequestExtended) => {
		const user = req.user;
		const data: {
			status:'REJECTED' | 'APPROVED';
			reqId:string
			user: User;
		} = {
			user: user,
			reqId:req.body.reqId,
			status: req.body.status ? req.body.status as 'REJECTED' | 'APPROVED' : 'REJECTED',
		};

		return petService.updatePetAdoptionService(data)
	})
);

export default router;
