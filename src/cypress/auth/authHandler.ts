import axios from 'axios';
import * as jose from 'jose';
import config from '../e2e/data/config';

/**
 * Create JWT using jose library
 * JSON Placeholder does not do any verification, so this doesn't matter
 * but it's a nice to have for a reference
 */
const createToken = async (url: string) => {
	let JWT = await new jose.SignJWT({
		[config.CLAIMS_NAME]: config.STANDARD_USER,
	})
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime('1h')
		.setIssuer(url)
		.setAudience(url)
		.sign(new TextEncoder().encode(config.SIGNING_KEY));

	let parts = JWT.split('.');
	JWT = `${parts[0]}.${parts[1]}.${config.SIGNING_KEY}`;

	return JWT;
};

export const axiosInstance = (url: string) => {
	let instance = axios.create({
		baseURL: url,
		timeout: 10000,
	});

	/* No need to actually use token
	instance.interceptors.request.use(async (config) => {
		const token = await createToken(url);
		config.headers.Authorization = token;

		return config;
	});
	*/

	return instance;
};
