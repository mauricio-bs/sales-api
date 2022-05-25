import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import ShowProductService from '../ShowProductService';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let showProductService: ShowProductService;

describe('Show product service', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository();
		showProductService = new ShowProductService(fakeProductsRepository);
	});

	it('should show product informations', async () => {
		const createdProduct = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		const product = await showProductService.execute(createdProduct.id);

		expect(product).toEqual(createdProduct);
	});

	it('should fail to find product by invalid id', async () => {
		const createdProduct = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		expect(
			showProductService.execute(createdProduct.id + '123'),
		).rejects.toBeInstanceOf(AppError);
	});
});
