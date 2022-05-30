import { v4 } from 'uuid';
import { IUserToken } from '../../models/IUserToken';
import { IUserTokensRepository } from '../IUSerTokensRepository';

export class FakeTokensRepository implements IUserTokensRepository {
	private user_tokens: IUserToken[] = [];

	public async findByToken(token: string): Promise<IUserToken | undefined> {
		const user_token = this.user_tokens.find(t => t.id === token);

		return user_token;
	}

	public async generate(user_id: string): Promise<IUserToken> {
		const user_token = {
			id: v4(),
			user_id,
			token: v4(),
			created_at: new Date(),
			updated_at: new Date(),
		};

		this.user_tokens.push(user_token);

		return user_token;
	}
}
