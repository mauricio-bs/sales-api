import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

export default class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductsRepository);

		const product = await productsRepository.findOne(id);

		if (!product) {
			throw new AppError('Product not found');
		}

		const producNametExists = await productsRepository.findByName(name);

		if (producNametExists && name !== product.name) {
			throw new AppError('There is already one product with this name');
		}

		const redisCache = new RedisCache();

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');

		product.name = name;
		product.price = price;
		product.quantity = quantity;

		await productsRepository.save(product);

		return product;
	}
}
