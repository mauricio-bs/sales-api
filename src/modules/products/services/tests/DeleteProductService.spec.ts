import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import DeleteProductService from '../DeleteProductService';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let deleteProductService: DeleteProductService;

describe('Delete products service', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository();
		deleteProductService = new DeleteProductService(fakeProductsRepository);
	});

	it('should delete a product', async () => {
		const product = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		expect(deleteProductService.execute(product.id)).resolves;
	});

	it('should fail to delete a product by invalid id', async () => {
		const product = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		expect(
			deleteProductService.execute(product.id + '123'),
		).rejects.toBeInstanceOf(AppError);
	});
});
