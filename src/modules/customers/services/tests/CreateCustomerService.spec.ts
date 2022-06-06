import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

// Global use
let createCustomer: CreateCustomerService;
let fakeCustomersRepository: FakeCustomersRepository;

describe('Create customer service', () => {
	beforeEach(() => {
		fakeCustomersRepository = new FakeCustomersRepository();
		createCustomer = new CreateCustomerService(fakeCustomersRepository);
	});

	it('should be able to create a new customer', async () => {
		expect(
			createCustomer.execute({
				name: 'Mauricio Schimit',
				email: 'email@teste.com',
			}),
		).resolves.toHaveProperty('id');
	});

	it('should not be able to create two customers with the same email', async () => {
		await createCustomer.execute({
			name: 'Mauricio Schimit',
			email: 'email@teste.com',
		});

		expect(
			createCustomer.execute({
				name: 'Mauricio Schimit',
				email: 'email@teste.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
