import Order from '../entities/Order';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICreateOrders } from '@modules/orders/domain/models/ICreateOrders';

@EntityRepository(Order)
class OrdersRepository implements IOrdersRepository {
	private ormRepository: Repository<Order>;

	constructor() {
		this.ormRepository = getRepository(Order);
	}

	public async findById(id: string): Promise<Order | undefined> {
		const order = await this.ormRepository.findOne(id, {
			relations: ['order_products', 'customer'],
		});

		return order;
	}

	public async create({ customer, products }: ICreateOrders): Promise<Order> {
		const order = this.ormRepository.create({
			customer,
			order_products: products,
		});

		await this.ormRepository.save(order);

		return order;
	}
}

export default OrdersRepository;
