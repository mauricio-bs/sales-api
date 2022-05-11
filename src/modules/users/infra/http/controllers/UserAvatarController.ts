import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateAvatar = new UpdateUserAvatarService();

		const user = await updateAvatar.execute({
			user_id: req.user.id,
			avatarFilename: req.file.filename,
		});

		return res.status(200).json(instanceToInstance(user));
	}
}
