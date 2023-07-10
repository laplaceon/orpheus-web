import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";

import { createUserWithEmail, getUserWithEmail } from "$lib/api";
import type { Provider } from "@auth/core/providers";
import { sequence } from "@sveltejs/kit/hooks";

const SECRET: string = "285c85ccc20fb129f836a9a9f458234a";
const JWT_SECRET: string = "23b0a759b4c131537cd5366d5e96f0b3";

let turnstile_key = '';

async function preauth({ event, resolve }) {
    if (event.request.url.includes("?turnstile_key=")) {
        const auth_url = new URL(event.request.url);
        turnstile_key = auth_url.searchParams.get("turnstile_key")!;
    }
    
    return resolve(event);
}

export const handle = sequence(
        preauth,
        SvelteKitAuth({
        providers: [
            Discord({ clientId: "1116791237484224602", clientSecret: "qKI4ldfTM_6u3hii0NNu1Uh31GKVecXV" }) as Provider
        ],
        secret: SECRET,
        callbacks: {
            async signIn({ profile }) {
                let res = await getUserWithEmail(profile?.email);

                if (res.status !== 200) {
                    let signUpRes = await createUserWithEmail(profile!.email!, turnstile_key);
                    
                    let json = await signUpRes.json();

                    console.log(json);

                    if (res.status == 200) {

                    }
                }

                return false;
            },
        },
    })
);
