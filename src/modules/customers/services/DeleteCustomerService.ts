import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

@injectable()
export default class DeleteCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}

	public async execute(id: string): Promise<void> {
		const customer = await this.customersRepository.findById(id);
		if (!customer) throw new AppError('Customer not found');

		await this.customersRepository.remove(customer);
	}
}
