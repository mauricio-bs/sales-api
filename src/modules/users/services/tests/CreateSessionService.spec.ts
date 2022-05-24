import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateSession from '../CreateSessionsService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';

let createSession: CreateSession;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateSession', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		createSession = new CreateSession(fakeUsersRepository, fakeHashProvider);
	});

	it('should be able to authenticate', async () => {
		const user = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		const response = await createSession.execute({
			email: 'email@gmail.com',
			password: '123456',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not be able to authenticate with non existent user', async () => {
		expect(
			createSession.execute({
				email: 'email@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		expect(
			createSession.execute({
				email: 'email@gmail.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
