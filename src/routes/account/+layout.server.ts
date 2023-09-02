import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const _user = cookies.get('user');

	if (!_user) {
        throw redirect(307, "/signin")
    }


    const user = JSON.parse(_user);

    return {
        user
    }
}