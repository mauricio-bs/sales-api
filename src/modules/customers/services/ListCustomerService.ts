import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomerService {
	public async execute(): Promise<Customer[]> {
		const customersRepository = getCustomRepository(CustomersRepository);

		const Customers = await customersRepository.find();

		return Customers;
	}
}
