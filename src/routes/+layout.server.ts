export function load({ cookies }) {
	let user = cookies.get('user');

	if (user) {
		user = JSON.parse(user);
	}

	return {
		user
	};
}