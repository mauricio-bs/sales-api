import { inject, injectable } from 'tsyringe';
import redisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { IPaginatedProducts } from '../domain/models/IPaginatedProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class ListProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,
	) {}

	public async execute(): Promise<IProduct[] | IPaginatedProducts[] | null> {
		let products = await redisCache.recover<IProduct[]>(
			'api-vendas-PRODUCT_LIST',
		);

		if (!products) {
			products = await this.productsRepository.findAll();

			await redisCache.save('api-vendas-PRODUCT_LIST', products);
		}

		return products;
	}
}
