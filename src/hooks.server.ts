import { getUserWithEmail } from '$lib/api';
import type { RequestEvent } from '@sveltejs/kit';
import { serialize } from 'cookie';

import jwt_decode from "jwt-decode";

const actions: string[] = [
    "session",
    "signin",
    "signout",
    "callback",
]

const prefix = "/auth";

export async function handle({ event, resolve }) {
    const { url, request } = event;

    const action = url.pathname
      .slice(prefix.length + 1)
      .split("/")[0]

    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) {
      return resolve(event)
    }

    if (action == "signin") {
      return handleSignin(event, url);
    } else if (action == "signout") {
      return handleSignout();
    }
}

const handleSignin = async (event: RequestEvent, url: URL) => {
    const credentials = Object.fromEntries(url.searchParams);

    let response = await getUserWithEmail(credentials.email, credentials.password, credentials.cf_token);
    const body = await response.json();

    let hookResponse = new Response(JSON.stringify(body));
    
    if (response.status == 200) {
      const decoded = jwt_decode(body.token);
      hookResponse.headers.append("Set-Cookie", serialize('user', JSON.stringify({token: body.token, user_id: decoded.id}), {
        path: '/',
        maxAge: 3600 * 24 * 30
			}))
    }

    return hookResponse;
};

const handleSignout = async () => {
  let hookResponse = new Response(JSON.stringify({"success": true}));
  hookResponse.headers.append("Set-Cookie", serialize('user', '', {
    path: '/'
  }))

  return hookResponse;
}