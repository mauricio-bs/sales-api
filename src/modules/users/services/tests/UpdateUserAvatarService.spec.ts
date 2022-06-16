import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../UpdateUserAvatarService';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;
let diskStorageProvider: DiskStorageProvider;

describe('Update user avatar service', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository);
		diskStorageProvider = new DiskStorageProvider();
	});

	it('should insert  the users first avatar successfully', async () => {
		const user = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@test.com',
			password: '123456',
		});

		if (!user) throw new Error('Fail to create a user');

		const updatedUser = await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename:
				'/home/mbschimit/Projetos/Cursos/Udemy/salesApi/uploads/tests/f89c24f463a276462a11-rato breach.png',
		});

		expect(updatedUser.avatar).toEqual(
			'/home/mbschimit/Projetos/Cursos/Udemy/salesApi/uploads/tests/f89c24f463a276462a11-rato breach.png',
		);
	});

	it('should update user avatar', async () => {
		const user = await fakeUsersRepository.create({
			name: 'test user',
			email: 'email@test.com',
			password: '123456',
		});

		if (!user) throw new Error('Fail to create a user');

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename:
				'/home/mbschimit/Projetos/Cursos/Udemy/salesApi/uploads/tests/image1.png',
		});

		const updatedUser = await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename:
				'/home/mbschimit/Projetos/Cursos/Udemy/salesApi/uploads/tests/17e021edc06a316ba23f-hacker-wallpaper-whatspaper-11.png',
		});

		expect(updatedUser.avatar).toEqual(
			'/home/mbschimit/Projetos/Cursos/Udemy/salesApi/uploads/tests/17e021edc06a316ba23f-hacker-wallpaper-whatspaper-11.png',
		);
	});
});
