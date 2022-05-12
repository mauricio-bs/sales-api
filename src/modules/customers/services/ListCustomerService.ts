import { inject, injectable } from 'tsyringe';
import { IPaginateCustomer } from '../domain/models/IPaginateCustomers';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class ListCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}

	public async execute(): Promise<IPaginateCustomer> {
		const customers = await this.customersRepository.findMany();

		return customers;
	}
}
