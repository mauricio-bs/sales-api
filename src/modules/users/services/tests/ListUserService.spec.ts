import 'reflect-metadata';
import ListUserService from '../ListUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let listUserService: ListUserService;

describe('List users service', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		listUserService = new ListUserService(fakeUsersRepository);
	});

	it('should return all users', async () => {
		const createdUser = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		const users = await listUserService.execute();

		expect(users[0]).toEqual(createdUser);
	});
});
