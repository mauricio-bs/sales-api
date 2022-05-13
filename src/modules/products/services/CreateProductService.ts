import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class CreateProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,
	) {}

	public async execute({
		name,
		price,
		quantity,
	}: ICreateProduct): Promise<IProduct> {
		const producNametExists = await this.productsRepository.findByName(name);

		if (producNametExists) {
			throw new AppError('There is already one product with this name');
		}

		const product = this.productsRepository.create({ name, price, quantity });

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');

		return product;
	}
}
