import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

export default class CreateSessionsService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findByEmail(email);
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
