import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomers';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

import Customer from '../entities/Customer';
import { getRepository, Repository } from 'typeorm';

class CustomersRepository implements ICustomersRepository {
	private ormRepository: Repository<Customer>;

	constructor() {
		this.ormRepository = getRepository(Customer);
	}

	public async findByName(name: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({ where: { name } });

		return customer;
	}

	public async findById(id: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({ where: { id } });

		return customer;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({ where: { email } });

		return customer;
	}

	public async findMany(): Promise<IPaginateCustomer> {
		const customers = await this.ormRepository.createQueryBuilder().paginate();

		return customers as IPaginateCustomer;
	}

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = this.ormRepository.create({ name, email });

		await this.ormRepository.save(customer);

		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		await this.ormRepository.save(customer);

		return customer;
	}

	public async remove(customer: ICustomer): Promise<void> {
		await this.ormRepository.delete(customer);
	}
}

export default CustomersRepository;
