import { v4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomers';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
	private customers: Customer[] = [];

	public async findByName(name: string): Promise<Customer | undefined> {
		const customer = this.customers.find(customer => customer.name === name);
		return customer;
	}

	public async findById(id: string): Promise<Customer | undefined> {
		const customer = this.customers.find(customer => customer.id === id);
		return customer;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const customer = this.customers.find(customer => customer.email === email);
		return customer;
	}

	public async findMany(): Promise<IPaginateCustomer> {
		return {
			from: 0,
			to: 0,
			per_page: 50,
			total: this.customers.length,
			current_page: 0,
			prev_page: null,
			next_page: null,
			data: this.customers,
		};
	}

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = new Customer();

		customer.id = v4();
		customer.name = name;
		customer.email = email;

		this.customers.push(customer);

		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		const findIndex = this.customers.findIndex(
			findCustomer => findCustomer.id === customer.id,
		);
		this.customers[findIndex] = customer;

		return customer;
	}

	public async remove(customer: ICustomer): Promise<void> {}
}

export default FakeCustomersRepository;
