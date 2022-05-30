import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import ListProductService from '../ListProductService';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let listProductService: ListProductService;

describe('List products service', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository();
		listProductService = new ListProductService(fakeProductsRepository);
	});

	it('should list all products registered', async () => {
		const createdProduct = await fakeProductsRepository.create({
			name: 'test product',
			price: 15,
			quantity: 10,
		});

		const products = await listProductService.execute();

		expect(products).toEqual([createdProduct]);
	});
});
