import 'reflect-metadata';
import ShowCustomerService from '../ShowCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomers: ShowCustomerService;

describe('Show customer service', () => {
	beforeEach(() => {
		fakeCustomersRepository = new FakeCustomersRepository();
		showCustomers = new ShowCustomerService(fakeCustomersRepository);
	});

	it('should find customer by id', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'test user',
			email: 'email@test.com',
		});

		const foundCustomer = await showCustomers.execute(customer.id);

		expect(foundCustomer).toHaveProperty('id');
	});

	it('should not find customer by id', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'test user',
			email: 'email@test.com',
		});

		expect(showCustomers.execute(customer.id + '5512')).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
