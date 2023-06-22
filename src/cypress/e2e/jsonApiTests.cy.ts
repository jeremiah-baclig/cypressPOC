import { axiosInstance } from '../auth/authHandler';
import homePage from '../e2e/pages/jsonPlaceholder/homePage';
import { posts, user } from './data/types';

// imports for POM
const home = new homePage();

const instance = axiosInstance(home.hostUrl);

let apiResult: string;

describe('GET', () => {
	it('Call todos', async () => {
		apiResult = JSON.stringify((await instance.get('/todos/1')).data);
	});

	it('Run script button returns same data as GET call', () => {
		home.navigate();
		home.runScript();

		home.getCodeResult('result').then((res) => {
			if (!(res.length > 0)) {
				assert.fail('No text returned in code block, could be failing to render.');
			}
			expect(res).to.equal(apiResult.replace(/\s/g, ''));
		});
	});

	it('Get users and sort them by alphabetical order', async () => {
		let users: user[] = JSON.parse(
			JSON.stringify((await instance.get('users')).data)
		);
		let sorted: string[] = [];

		users.map((user) => {
			sorted.push(user.name);
		});

		sorted.sort().forEach((name) => {
			cy.log(name);
		});

		expect(sorted.length).to.equal(users.length);
	});
});

describe('POST', () => {
	it('Create post returns', async () => {
		const randomPost: posts = {
			userId: 11,
			id: 101,
			title: 'this is a title',
			body: 'this is the body',
		};

		const res = await instance.post('/posts', JSON.stringify(randomPost));
		const resultPost: posts = JSON.parse(res.config.data);

		expect(resultPost).to.eql(randomPost);
	});
});
