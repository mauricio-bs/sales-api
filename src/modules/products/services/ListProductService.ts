import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

export default class ListProductService {
	public async execute(): Promise<Product[]> {
		const productsRepository = getCustomRepository(ProductsRepository);

		let products = await redisCache.recover<Product[]>(
			'api-vendas-PRODUCT_LIST',
		);
		if (!products) {
			products = await productsRepository.find();

			await redisCache.save('api-vendas-PRODUCT_LIST', products);
		}

		return products;
	}
}
