import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import AppError from '@shared/errors/AppError';
import { ICreateSesstion } from '../domain/models/ICreateSession';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IResponse {
	user: IUser;
	token: string;
}

@injectable()
export default class CreateSessionsService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}

	public async execute({
		email,
		password,
	}: ICreateSesstion): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Incorrect email / password combination', 401);
		}

		if (!(await compare(password, user.password))) {
			throw new AppError('Incorrect email / password combination', 401);
		}

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.secret,
		});

		return { user, token };
	}
}
