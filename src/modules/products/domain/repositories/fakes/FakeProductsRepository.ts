import Product from '@modules/products/infra/typeorm/entities/Product';

import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProducts';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IFindManyProductsByIds } from '@modules/products/domain/models/IFindManyProductsByIds';
import { v4 } from 'uuid';

export default class FakeProductsRepository implements IProductsRepository {
	private products: Product[] = [];

	public async findAll(): Promise<IProduct[] | null> {
		return this.products;
	}

	public async findById(id: string): Promise<IProduct | undefined> {
		const product = this.products.find(p => p.id === id);
		return product;
	}

	public async findByName(name: string): Promise<IProduct | undefined> {
		const product = this.products.find(p => p.name === name);
		return product;
	}

	public async findAllByIds(
		products: IFindManyProductsByIds[],
	): Promise<IProduct[]> {
		const prods = this.products.filter(p => products.includes(p));
		return prods;
	}

	public async create(product: ICreateProduct): Promise<IProduct> {
		const prod = new Product();

		prod.id = v4();
		prod.name = product.name;
		prod.quantity = product.quantity;
		prod.price = product.price;

		this.products.push(prod);

		return prod;
	}

	public async save(product: Product): Promise<IProduct> {
		const findIndex = this.products.findIndex(
			findProduct => findProduct.id === product.id,
		);
		this.products[findIndex] = product;

		return product;
	}

	public async remove(product: Product): Promise<void> {
		const findIndex = this.products.findIndex(
			findProduct => findProduct.id === product.id,
		);

		this.products.splice(findIndex, 1);
	}
}
