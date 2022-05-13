import { IProduct } from '../models/IProduct';
import { ICreateProduct } from '../models/ICreateProducts';
import { IFindManyProductsByIds } from '../models/IFindManyProductsByIds';

export interface IProductsRepository {
	findById(id: string): Promise<IProduct | undefined>;
	findAll(): Promise<IProduct[] | null>;
	findByName(name: string): Promise<IProduct | undefined>;
	findAllByIds(products: IFindManyProductsByIds[]): Promise<IProduct[]>;

	create(product: ICreateProduct): Promise<IProduct>;
	save(product: ICreateProduct): Promise<IProduct>;
	remove(product: IProduct): Promise<void>;
}
