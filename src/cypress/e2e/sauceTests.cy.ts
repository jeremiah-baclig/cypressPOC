import { axiosInstance } from '../auth/authHandler';
import config from './data/config';
import { user } from './data/types';
import cartPage from './pages/sauceLabs/cartPage';
import landingPage from './pages/sauceLabs/landingPage';
import loginPage from './pages/sauceLabs/loginPage';
import userInfoPage from './pages/sauceLabs/userInfoPage';
import homePage from './pages/jsonPlaceholder/homePage';
import overviewPage from './pages/sauceLabs/overviewPage';

// imports for POM
const home = new homePage();
const login = new loginPage();
const landing = new landingPage();
const cart = new cartPage();
const userInfo = new userInfoPage();
const overview = new overviewPage();

const instance = axiosInstance(home.hostUrl);

let retrievedUsers: user[];

describe('User journey end to end', () => {
	before(async () => {
		retrievedUsers = JSON.parse(
			JSON.stringify((await instance.get('users')).data)
		);
	});

	it('Can buy items and checkout', () => {
		login.navigate();
		login.loginAs(config.STANDARD_USER, config.PASSWORD);

		landing.addAllToCart('data-test', 'add-to-cart-sauce-labs');
		landing.goToCart();

		cart.verifyShoppingCartLength();
		cart.checkoutCart();

		userInfo.submitUserInfo(
			retrievedUsers[0].username,
			retrievedUsers[1].username,
			retrievedUsers[0].address.zipcode
		);

		overview.submitOrder();
		overview.confirmOrderComplete();
	});
});

describe('Positive user flow', () => {
	it('Login as normal user and verify filters do not affect item selection', () => {
		login.navigate();
		login.loginAs(config.STANDARD_USER, config.PASSWORD);

		landing.selectFilterOption('az');
		landing.addAllToCart('data-test', 'add-to-cart-');

		landing.selectFilterOption('za');
		landing.checkShoppingCartBadge().then((res) => {
			expect(parseInt(res)).to.equal(6);
		});
		landing.selectFilterOption('lohi');

		landing.selectFilterOption('hilo');
		landing.addAllToCart('data-test', 'remove-sauce-labs')
	});
});

describe('Negative user flow', () => {
	it('Locked out user cannot login', () => {
		login.navigate();
		login.loginAs(config.LOCKED_OUT_USER, config.PASSWORD);

		login.getAndAssertError();
	});

	it('Invalid credentials cannot login', () => {
		const badString = 'asd123!';

		login.navigate();
		login.loginAs(
			config.STANDARD_USER + badString,
			config.PASSWORD + badString
		);

		login.getAndAssertError();
	});
});
