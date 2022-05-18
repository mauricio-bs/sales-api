import { IOrder } from '../models/IOrder';
import { ICreateOrders } from '../models/ICreateOrders';

export interface IOrdersRepository {
	findById(id: string): Promise<IOrder | undefined>;
	create(order: ICreateOrders): Promise<IOrder>;
}
