import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateSesstionRequest } from '../domain/models/ICreateSessionRequest';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateSessionsService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('HashContainer') private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: ICreateSesstionRequest): Promise<ICreateSession> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Incorrect email / password combination', 401);
		}

		if (!(await this.hashProvider.compareHash(password, user.password))) {
			throw new AppError('Incorrect email / password combination', 401);
		}

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return { user, token };
	}
}
