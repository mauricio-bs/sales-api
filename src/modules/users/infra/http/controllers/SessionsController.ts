import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionsService from '../../../services/CreateSessionsService';

export default class SessionsController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const createSession = container.resolve(CreateSessionsService);

		const user = await createSession.execute({ email, password });

		return res.status(200).json(instanceToInstance(user));
	}
}
