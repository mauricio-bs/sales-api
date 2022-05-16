import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
export default class ShowProfileService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}

	public async execute(user_id: string): Promise<IUser> {
		const user = await this.usersRepository.findById(user_id);
		if (!user) throw new AppError('User not found');

		return user;
	}
}
