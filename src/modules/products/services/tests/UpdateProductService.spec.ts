import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import UpdateProductService from '../UpdateProductService';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductService;

describe('Update products service', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository();
		updateProductService = new UpdateProductService(fakeProductsRepository);
	});

	it('should update product successfully', async () => {
		const product = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		const updatedProduct = await updateProductService.execute(product.id, {
			name: 'updated product',
			price: 15,
			quantity: 10,
		});

		expect(updatedProduct.name).not.toBe('test product');
	});

	it('should fail to update product with already existing name', async () => {
		await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		const product = await fakeProductsRepository.create({
			name: 'test product to update',
			price: 10,
			quantity: 20,
		});

		expect(
			updateProductService.execute(product.id, {
				name: 'test product',
				price: 10,
				quantity: 20,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should failt to update product by invalid id', async () => {
		const product = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		expect(
			updateProductService.execute(product.id + '123', {
				name: 'updated product',
				price: 15,
				quantity: 10,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
