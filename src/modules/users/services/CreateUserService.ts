import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import AppError from '@shared/errors/AppError';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('HashProvider') private hashProvider: IHashProvider,
	) {}

	public async execute({
		name,
		email,
		password,
	}: ICreateUser): Promise<IUser | undefined> {
		const emailExists = await this.usersRepository.findByEmail(email);
		if (emailExists) throw new AppError('Email address already used');

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}
