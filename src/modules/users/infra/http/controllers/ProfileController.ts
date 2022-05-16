import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

export default class ProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const showProfile = container.resolve(ShowProfileService);
		const user_id = req.user.id;

		const user = await showProfile.execute(user_id);

		return res.status(200).json(instanceToInstance(user));
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const { name, email, password, old_password } = req.body;

		const updateProfile = container.resolve(UpdateProfileService);

		const user = await updateProfile.execute(user_id, {
			name,
			email,
			password,
			old_password,
		});

		return res.status(202).json(instanceToInstance(user));
	}
}
