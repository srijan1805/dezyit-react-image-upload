import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			_id: string;
			name: string;
			email: string;
			photoURL: string;
			companyName: string;
			createdAt: Date;
			access_token: string;
		};
	}
}
