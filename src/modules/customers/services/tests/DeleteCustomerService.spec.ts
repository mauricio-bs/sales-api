import 'reflect-metadata';
import DeleteCustomerService from '../DeleteCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;

describe('Delete customer service', () => {
	beforeEach(() => {
		fakeCustomersRepository = new FakeCustomersRepository();
		deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
	});

	it('should delete customer by his id', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'test user',
			email: 'email@test.com',
		});

		expect(deleteCustomer.execute(customer.id)).resolves;
	});

	it('should not delete customer by invalid id', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'test user',
			email: 'email@test.com',
		});

		expect(
			deleteCustomer.execute(customer.id + '12345'),
		).rejects.toBeInstanceOf(AppError);
	});
});
