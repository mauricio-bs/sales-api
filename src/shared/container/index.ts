import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<ICustomersRepository>(
	'CustomersRepository',
	CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
	'ProductsRepository',
	ProductsRepository,
);
