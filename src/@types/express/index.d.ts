declare namespace Express {
	export interface Request {
		user: { id: string };
		file: Express.Request.file | undefined;
	}
}
