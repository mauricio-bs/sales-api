import { IProduct } from '@modules/products/domain/models/IProduct';
import { IOrder } from './IOrder';

export interface IOrdersProducts {
	id: string;
	price: number;
	quantity: number;
	order: IOrder;
	product: IProduct;
	created_at: Date;
	updated_at: Date;
}
