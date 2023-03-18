import axios from "axios";
import { decode } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	secret: "u9KCmIv4fhAa9R/xIf3BjW20FsA4O9Z4cnRoM4+MI+E=",
	providers: [
		CredentialsProvider({
			name: "login",
			credentials: {
				email: {
					label: "Enter your email address",
					type: "email",
					name: "email",
					placeholder: "abc@xyz.com",
				},
				password: {
					label: "Enter your password",
					type: "password",
					name: "password",
					placeholder: "******",
				},
			},
			async authorize(credentials, req) {
				try {
					const response = await axios.post<any>(
						"https://admin.dezyit.com/api/v1/auth/login",
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);
					return {
						...credentials,
						id: response.data.response.access_token,
					};
				} catch (error: any) {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async session(params) {
			const access_token = params.token.sub;
			const decodedToken = await decode(access_token!, { complete: true });
			if (decodedToken && typeof decodedToken.payload === "string") {
				const user = JSON.parse(decodedToken.payload);
				return {
					user: { ...user, access_token },
					expires: new Date(new Date().getTime() + 5000).toISOString(),
				};
			} else {
				return {
					user:
						typeof decodedToken?.payload === "object"
							? { ...decodedToken?.payload, access_token }
							: { access_token },
					expires: new Date().toISOString(),
				};
			}
		},
		jwt(params) {
			return params.token;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
