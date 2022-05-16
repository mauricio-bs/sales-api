import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
	findAll(): Promise<IUser[]>;
	findById(id: string): Promise<IUser | undefined>;
	findByName(name: string): Promise<IUser | undefined>;
	findByEmail(email: string): Promise<IUser | undefined>;

	create(user: ICreateUser): Promise<IUser | undefined>;
	save(user: ICreateUser): Promise<IUser | undefined>;
	remove(user: IUser): Promise<void>;
}
