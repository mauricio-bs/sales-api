import { FakeTokensRepository } from '@modules/users/domain/repositories/fakes/FakeTokensRepository';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTokensRepository: FakeTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('Send forgot password email service', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeTokensRepository = new FakeTokensRepository();
		sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeTokensRepository,
		);
	});

	it('should fail to send recover email by non existent user email', async () => {
		expect(
			sendForgotPasswordEmailService.execute('email@test.com'),
		).rejects.toBeInstanceOf(AppError);
	});
});
