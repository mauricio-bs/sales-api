import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';

export default class UsersController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listUser = container.resolve(ListUserService);

		const users = await listUser.execute();

		return res.status(200).json(instanceToInstance(users));
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({ name, email, password });

		return res.status(201).json(instanceToInstance(user));
	}
}
