import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authHeader = req.headers.authorization;

	if (!authHeader) throw new AppError('Token is missing', 401);

	const [, token] = authHeader.split(' ');

	try {
		const decodedToken = verify(token, authConfig.jwt.secret);

		const { sub } = decodedToken as ITokenPayload;

		req.user = { id: sub };

		return next();
	} catch (err) {
		throw new AppError('Invalid Token');
	}
}
