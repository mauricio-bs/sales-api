import { IUser } from './IUser';

export interface ICreateSession {
	user: IUser;
	token: string;
}
