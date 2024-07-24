import { body } from 'express-validator';

// Login validation rules
export const loginValidationRules = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').notEmpty().withMessage('Password is required'),
];

export const registerValidationRules = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').notEmpty().withMessage('Password is required'),
	body('role').isIn(['ADMIN', 'USER']).withMessage('Role must be either ADMIN or USER'),
	body('name').notEmpty().withMessage('Name is required')
];

export const updateUserValidationRules = [
	body('role').isIn(['ADMIN', 'USER']).withMessage('Role must be either ADMIN or USER'),
	body('name').notEmpty().withMessage('Name is required'),
	body('updateUserId').notEmpty().isUUID().withMessage('updateUserId is required'),

];

export const ceatePetValidationRules = [
	body('name').notEmpty().withMessage('Name is required'),
	body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
	body('description').notEmpty().withMessage('Description is required'),
	body('species').notEmpty().withMessage('Species is required')
];
export const adoptionValidationRules = [
	body('petId').notEmpty().withMessage('petId is required'),
];

export const handleAdoptionValidationRules = [
	body('reqId').notEmpty().withMessage('reqId is required'),
	body('status').isIn(['REJECTED' , 'APPROVED']).withMessage('ststus must be REJECTED  or APPROVED'),

];
export const getAdoptionValidationRules = [
	body('status').optional().isIn(['REJECTED', 'PENDING', 'APPROVED']).withMessage('ststus must be REJECTED,PENDING  or APPROVED'),

];