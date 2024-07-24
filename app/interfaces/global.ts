import { Request } from 'express';

export interface RequestExtended extends Request {
	user?: any;
	id?: any;
	traceId?: any;
	file?: any;
	logId?: any;
	log?: any;
	error?: any;
	idAdmin?: any;
	accessToken?: any;
	refreshToken?: any;
}
export interface User {
	id: string;
	email: string;
}
