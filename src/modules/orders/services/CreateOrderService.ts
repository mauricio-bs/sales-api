import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IOrder } from '../domain/models/IOrder';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

@injectable()
export default class CreateOrderService {
	constructor(
		@inject('OrdersRepository')
		private ordersRepository: IOrdersRepository,
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,
	) {}

	public async execute({
		customer_id,
		products,
	}: IRequestCreateOrder): Promise<IOrder> {
		// Check existence of customer and products
		const customerExists = await this.customersRepository.findById(customer_id);
		if (!customerExists) {
			throw new AppError('Could not fund any customer with the given id');
		}

		const existsProducts = await this.productsRepository.findAllByIds(products);

		if (!existsProducts.length) {
			throw new AppError('Could not find any products with the given ids');
		}

		const existsProductsIds = existsProducts.map(product => product.id);

		const checkInexistentProducts = products.filter(
			product => !existsProductsIds.includes(product.id),
		);

		if (checkInexistentProducts.length) {
			throw new AppError(
				`Could not find product ${checkInexistentProducts[0].id}`,
			);
		}

		// Check product if stock quantity is enough
		const quantityUnavailable = products.filter(
			product =>
				existsProducts.filter(p => p.id === product.id)[0].quantity <
				product.quantity,
		);

		if (quantityUnavailable.length) {
			throw new AppError(
				`The quantity ${quantityUnavailable[0].quantity} is not available for ${quantityUnavailable[0].id}`,
			);
		}

		// Create order
		const serializedProducts = products.map(product => ({
			product_id: product.id,
			quantity: product.quantity,
			price: existsProducts.filter(p => p.id === product.id)[0].price,
		}));

		const order = await this.ordersRepository.create({
			customer: customerExists,
			products: serializedProducts,
		});

		const { order_products } = order;

		// Update product stock quantity
		const updatedProductQuantity = order_products.map(product => ({
			id: product.product_id,
			quantity:
				existsProducts.filter(p => p.id === product.product_id)[0].quantity -
				product.quantity,
		}));

		await this.productsRepository.save(updatedProductQuantity);

		return order;
	}
}
