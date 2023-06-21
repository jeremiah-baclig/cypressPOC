export type coordinates = {
	lat: number;
	lng: number;
};

export type address = {
	street: string;
	suite: string;
	city: string;
	zipcode: number;
	geo: coordinates;
};

export type company = {
	name: string;
	catchPhrase: string;
	bs: string;
};

export type user = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: address;
	phone: string;
	website: string;
	company: company;
};

export type posts = {
	userId: number;
	id: number;
	title: string;
	body: string;
};
