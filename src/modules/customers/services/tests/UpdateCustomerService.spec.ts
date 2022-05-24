import 'reflect-metadata';
import UpdateCustomerService from '../UpdateCustomerService';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

// Global use
let updateCustomer: UpdateCustomerService;
let fakeCustomersRepository: FakeCustomersRepository;

describe('Update customer service', () => {
	beforeEach(() => {
		fakeCustomersRepository = new FakeCustomersRepository();
		updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
	});

	it('should be able to update customer', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'Mauricio Schimit',
			email: 'email@teste.com',
		});

		const updatedCustomer = await updateCustomer.execute(customer.id, {
			name: 'test user',
			email: 'update@email.com',
		});

		expect(updatedCustomer.name).toEqual('test user');
		expect(updatedCustomer.email).toEqual('update@email.com');
	});

	it('should not be able to update customer email to another existent email', async () => {
		await fakeCustomersRepository.create({
			name: 'test user 1',
			email: 'email@teste.com',
		});

		const customer = await fakeCustomersRepository.create({
			name: 'test user 2',
			email: 'test@email.com',
		});

		expect(
			updateCustomer.execute(customer.id, {
				name: 'test user 2',
				email: 'email@teste.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not update customer by invalid id', async () => {
		const customer = await fakeCustomersRepository.create({
			name: 'Mauricio Schimit',
			email: 'email@teste.com',
		});

		expect(
			updateCustomer.execute(customer.id + 'invalid', {
				name: 'test user',
				email: 'update@email.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
