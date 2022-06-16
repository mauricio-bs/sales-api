import 'reflect-metadata';
import UpdateProfileService from '../UpdateProfileService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('Update profile service', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		updateProfileService = new UpdateProfileService(fakeUsersRepository);
	});

	it('should update user profile successfully', async () => {
		const user = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '123456',
		});

		if (!user) throw new Error('Fail to create user');

		const updatedUser = await updateProfileService.execute(user.id, {
			name: 'test update user',
			email: 'email@gmail.com',
		});

		expect(updatedUser.name).not.toEqual('test user');
	});

	it('should fail to update user profile by invalid id', async () => {
		expect(
			updateProfileService.execute('a6s5d1as56', {
				name: 'test update user',
				email: 'email@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should fail to update email to a existent email', async () => {
		await fakeUsersRepository.create({
			name: 'test user 1',
			email: 'email@gmail.com',
			password: '123456',
		});

		const user = await fakeUsersRepository.create({
			name: 'test user 2',
			email: 'test@gmail.com',
			password: 'testpassword123',
		});

		if (!user) throw new Error('Fail to create user');

		expect(
			updateProfileService.execute(user.id, {
				name: 'test update user',
				email: 'email@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should fail to update password passing wrong old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '12345',
		});

		if (!user) throw new Error('Fail to create user');

		expect(
			updateProfileService.execute(user.id, {
				name: 'test user',
				email: 'email@gmail.com',
				password: 'abc123456',
				old_password: '1234567',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should fail to update password without send the old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@gmail.com',
			password: '12345',
		});

		if (!user) throw new Error('Fail to create user');

		expect(
			updateProfileService.execute(user.id, {
				name: 'test user',
				email: 'email@gmail.com',
				password: 'abc123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
