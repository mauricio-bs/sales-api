import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { IPaginateCustomer } from '../models/IPaginateCustomers';

export interface ICustomersRepository {
	findByName(name: string): Promise<ICustomer | undefined>;
	findById(id: string): Promise<ICustomer | undefined>;
	findByEmail(email: string): Promise<ICustomer | undefined>;
	findMany(): Promise<IPaginateCustomer>;
	create(data: ICreateCustomer): Promise<ICustomer>;
	save(customer: ICreateCustomer): Promise<ICustomer>;
	remove(customer: ICustomer): Promise<void>;
}
