import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrders {
	customer: ICustomer;
	products: ICreateOrderProducts[];
}
