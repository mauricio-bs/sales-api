import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class DeleteProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,
	) {}

	public async execute(id: string): Promise<void> {
		const product = await this.productsRepository.findById(id);

		if (!product) {
			throw new AppError('Product not found');
		}

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');

		await this.productsRepository.remove(product);
	}
}
