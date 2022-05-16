import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { IResetPassword } from '../domain/models/IResetPassword';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUSerTokensRepository';

@injectable()
export default class ResetPasswordService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('UserTokensRepository')
		private userTokenRepository: IUserTokensRepository,
	) {}

	public async execute({ token, password }: IResetPassword): Promise<void> {
		const userToken = await this.userTokenRepository.findByToken(token);
		if (!userToken) throw new AppError('User token does not exists.');

		const user = await this.usersRepository.findById(userToken.user_id);
		if (!user) throw new AppError('User does not exists.');

		const compareDate = addHours(userToken.created_at, 2);

		if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

		user.password = await hash(password, 8);
	}
}
