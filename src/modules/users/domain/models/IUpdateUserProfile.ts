export interface IUpdateUserProfile {
	name: string;
	email: string;
	password?: string;
	old_password?: string;
}
