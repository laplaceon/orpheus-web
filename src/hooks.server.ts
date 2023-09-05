import { getUserWithEmail } from '$lib/api';
import type { RequestEvent } from '@sveltejs/kit';
import { serialize } from 'cookie';

import jwt_decode from "jwt-decode";

// import * as Sentry from "@sentry/sveltekit";

// Sentry.init({
//   dsn: "https://c98d9c3d45c585cd7b787129438a73c4@o4505818349240320.ingest.sentry.io/4505818417201152",
//   integrations: [
//     new Sentry.Replay(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

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