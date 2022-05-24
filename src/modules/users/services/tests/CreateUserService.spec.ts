import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUserService', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
	});

	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create a two user with the same email', async () => {
		await createUser.execute({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		expect(
			createUser.execute({
				name: 'test user',
				email: 'email@gmail.com',
				password: '12345678',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
