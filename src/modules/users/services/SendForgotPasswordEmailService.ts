import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/Mail';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUSerTokensRepository';

@injectable()
export default class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,
	) {}

	public async execute(email: string): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) throw new AppError('User does not exists.');

		const { token } = await this.userTokensRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		if (mailConfig.driver === 'ses') {
			await SESMail.sendMail({
				to: {
					name: user.name,
					email: user.email,
				},
				subject: '[API Vendas] Recuperação de Senha',
				templateData: {
					file: forgotPasswordTemplate,
					variables: {
						name: user.name,
						link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
					},
				},
			});
			return;
		}

		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[API Vendas] Recuperação de Senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
				},
			},
		});
	}
}
