import { v4 } from 'uuid';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async findAll(): Promise<IUser[]> {
		return this.users;
	}

	public async findByName(name: string): Promise<User | undefined> {
		const user = this.users.find(user => user.name === name);
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.users.find(user => user.id === id);
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find(user => user.email === email);
		return user;
	}

	public async create({
		name,
		email,
		password,
	}: ICreateUser): Promise<IUser | undefined> {
		const user = new User();

		user.id = v4();
		user.name = name;
		user.email = email;
		user.password = password;

		this.users.push(user);

		return user;
	}

	public async save(user: User): Promise<IUser | undefined> {
		const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

		this.users[findIndex] = user;

		return user;
	}

	public async remove(user: IUser): Promise<void> {}
}

export default FakeUsersRepository;
