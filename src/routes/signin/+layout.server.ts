import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    const session = await event.locals.getSession();

    if (session != null) {
        throw redirect(307, "/");
    }
  };