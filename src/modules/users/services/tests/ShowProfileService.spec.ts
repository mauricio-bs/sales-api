import 'reflect-metadata';
import ShowProfileService from '../ShowProfileService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Show profile service', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});

	it('should show user profile', async () => {
		const createdUser = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		if (!createdUser) throw new Error('Fail to create user');

		const user = await showProfileService.execute(createdUser.id);

		expect(user).toEqual(createdUser);
	});

	it('should not show user profile by invalid id', async () => {
		expect(showProfileService.execute('a5s6d1as561')).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
