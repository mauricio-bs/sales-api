import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService.ts';

export default class OrdersController {
	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showOrder = container.resolve(ShowOrderService);

		const order = await showOrder.execute(id);

		return res.status(200).json(order);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { customer_id, products } = req.body;

		const createOrder = container.resolve(CreateOrderService);

		const order = await createOrder.execute({ customer_id, products });

		return res.status(201).json(order);
	}
}
