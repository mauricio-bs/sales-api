import 'reflect-metadata';
import ListCustomerService from '../ListCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomer: ListCustomerService;

describe('List customer service', () => {
	beforeEach(() => {
		fakeCustomersRepository = new FakeCustomersRepository();
		listCustomer = new ListCustomerService(fakeCustomersRepository);
	});

	it('should find all customers registered', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'test user',
			email: 'email@test.com',
		});

		const foundCustomer = await listCustomer.execute();

		expect(foundCustomer.total).toBe(1);
		expect(foundCustomer.data[0]).toEqual(customer);
	});
});
