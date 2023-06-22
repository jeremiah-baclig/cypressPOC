import { axiosInstance } from '../auth/authHandler';
import homePage from '../e2e/pages/jsonPlaceholder/homePage';
import { posts, user } from './data/types';

// imports for POM
const home = new homePage();

const instance = axiosInstance(home.hostUrl);

describe('GET', () => {
	it('Call comments', async () => {
		const apiResult = (await instance.get('/comments?postId=1'));
		
		expect(apiResult.status).to.be.equal(200);
		expect(apiResult.statusText.toString()).to.be.equal('OK');
	});

	it('Run script button returns same data as GET call', async () => {
		const apiResult = JSON.stringify((await instance.get('/todos/1')).data);

		home.navigate();
		home.runScript(apiResult);
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
