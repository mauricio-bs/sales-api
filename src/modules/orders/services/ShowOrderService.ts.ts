import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

export default class ShowOrderService {
	public async execute(id: string): Promise<Order> {
		const ordersRepository = getCustomRepository(OrdersRepository);

		const order = await ordersRepository.findById(id);
		if (!order) throw new AppError('Order not found');

		return order;
	}
}
