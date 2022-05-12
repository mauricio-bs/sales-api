import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
	name: string;
	email: string;
}

@injectable()
export default class UpdateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}

	public async execute(
		id: string,
		{ name, email }: IRequest,
	): Promise<ICustomer> {
		const customer = await this.customersRepository.findById(id);
		if (!customer) throw new AppError('Customer not found');

		const customerExists = await this.customersRepository.findByEmail(email);
		if (customerExists && customerExists.email !== email) {
			throw new AppError('There is already one customer with this email.');
		}

		customer.name = name;
		customer.email = email;

		await this.customersRepository.save(customer);

		return customer;
	}
}
