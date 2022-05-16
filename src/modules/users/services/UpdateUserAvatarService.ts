import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import AppError from '@shared/errors/AppError';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

@injectable()
export default class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}

	public async execute({
		user_id,
		avatarFilename,
	}: IUpdateUserAvatar): Promise<IUser> {
		const storageProvider = new DiskStorageProvider();

		const user = await this.usersRepository.findById(user_id);
		if (!user) throw new AppError('User not found');

		if (uploadConfig.driver === 's3') {
			const s3Provider = new S3StorageProvider();
			if (user.avatar) {
				await s3Provider.deleteFile(user.avatar);
			}

			const filename = await storageProvider.saveFile(avatarFilename);
			user.avatar = filename;
		} else {
			if (user.avatar) {
				await storageProvider.deleteFile(user.avatar);
			}

			const filename = await storageProvider.saveFile(avatarFilename);
			user.avatar = filename;
		}

		await this.usersRepository.save(user);

		return user;
	}
}
