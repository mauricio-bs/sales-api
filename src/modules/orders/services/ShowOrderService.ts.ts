import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
export default class ShowOrderService {
	constructor(
		@inject('OrdersRepository') private ordersRepository: IOrdersRepository,
	) {}

	public async execute(id: string): Promise<IOrder> {
		const order = await this.ordersRepository.findById(id);
		if (!order) throw new AppError('Order not found');

		return order;
	}
}
