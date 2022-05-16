import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateAvatar = container.resolve(UpdateUserAvatarService);

		const user = await updateAvatar.execute({
			user_id: req.user.id,
			avatarFilename: req.file.filename,
		});

		return res.status(200).json(instanceToInstance(user));
	}
}
