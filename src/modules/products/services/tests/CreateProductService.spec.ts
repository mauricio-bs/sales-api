import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;

describe('Create products service', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository();
		createProductService = new CreateProductService(fakeProductsRepository);
	});

	it('should create product successfully', async () => {
		const product = await createProductService.execute({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		expect(product).toHaveProperty('id');
	});

	it('should fail to create product with already existing name', async () => {
		await createProductService.execute({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		expect(
			createProductService.execute({
				name: 'test product',
				price: 17,
				quantity: 5,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
