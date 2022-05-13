import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class UpdateProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,
	) {}

	public async execute(
		id: string,
		{ name, price, quantity }: ICreateProduct,
	): Promise<IProduct> {
		const product = await this.productsRepository.findById(id);

		if (!product) throw new AppError('Product not found');

		const producNametExists = await this.productsRepository.findByName(name);

		if (producNametExists && name !== product.name) {
			throw new AppError('There is already one product with this name');
		}

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');

		product.name = name;
		product.price = price;
		product.quantity = quantity;

		await this.productsRepository.save(product);

		return product;
	}
}
