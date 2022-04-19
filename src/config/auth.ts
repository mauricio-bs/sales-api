export default {
	jwt: {
		secret: process.env.APP_SECRET || 'e60e8f5f8f0f3572fe2bc9b3035ac2ef',
		expiresIn: '1d',
	},
};
