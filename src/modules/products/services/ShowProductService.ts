import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class ShowProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,
	) {}

	public async execute(id: string): Promise<IProduct | undefined> {
		const product = await this.productsRepository.findById(id);

		if (!product) {
			throw new AppError('Product not found');
		}

		return product;
	}
}
