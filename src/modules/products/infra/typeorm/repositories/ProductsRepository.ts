import Product from '../entities/Product';
import { getRepository, In, Repository } from 'typeorm';

import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProducts';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IFindManyProductsByIds } from '@modules/products/domain/models/IFindManyProductsByIds';

export default class ProductsRepository implements IProductsRepository {
	private ormRepository: Repository<Product>;

	constructor() {
		this.ormRepository = getRepository(Product);
	}

	public async findAll(): Promise<IProduct[] | null> {
		const products = await this.ormRepository.find();

		return products;
	}

	public async findById(id: string): Promise<IProduct | undefined> {
		const product = await this.ormRepository.findOne(id);

		return product;
	}

	public async findByName(name: string): Promise<IProduct | undefined> {
		const product = await this.ormRepository.findOne({ where: { name } });

		return product;
	}

	public async findAllByIds(
		products: IFindManyProductsByIds[],
	): Promise<IProduct[]> {
		const productIds = products.map(product => product.id);

		const existsProducts = await this.ormRepository.find({
			where: { id: In(productIds) },
		});

		return existsProducts;
	}

	public async create(product: ICreateProduct): Promise<IProduct> {
		const createdProduct = this.ormRepository.create(product);

		await this.ormRepository.save(createdProduct);

		return createdProduct;
	}

	public async save(product: Product): Promise<IProduct> {
		await this.ormRepository.save(product);

		return product;
	}

	public async remove(product: Product): Promise<void> {
		await this.ormRepository.remove(product);
	}
}
