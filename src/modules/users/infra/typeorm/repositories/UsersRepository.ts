import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findAll(): Promise<IUser[]> {
		const users = await this.ormRepository.find();

		return users;
	}

	public async findByName(name: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({ where: { name } });

		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({ where: { id } });

		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({ where: { email } });

		return user;
	}

	public async create(user: ICreateUser): Promise<IUser | undefined> {
		const createdUser = this.ormRepository.create(user);

		await this.ormRepository.save(createdUser);

		return createdUser;
	}

	public async save(user: User): Promise<IUser | undefined> {
		await this.ormRepository.save(user);

		return user;
	}
	public async remove(user: IUser): Promise<void> {
		await this.ormRepository.delete(user);
	}
}

export default UsersRepository;
