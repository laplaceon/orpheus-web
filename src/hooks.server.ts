import { SvelteKitAuth } from "@auth/sveltekit";
// import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";

import { getUserWithEmail } from "$lib/api";
import type { Provider } from "@auth/core/providers";

import { page } from "$app/stores";

const SECRET: string = "285c85ccc20fb129f836a9a9f458234a";
const JWT_SECRET: string = "23b0a759b4c131537cd5366d5e96f0b3";

export const handle = SvelteKitAuth({
    providers: [
        Discord({ clientId: "1116791237484224602", clientSecret: "qKI4ldfTM_6u3hii0NNu1Uh31GKVecXV" }) as Provider
    ],
    secret: SECRET,
    callbacks: {
        async signIn({ profile }) {
            let res = await getUserWithEmail(profile?.email);

            if (res.status !== 200) {
                return "/signin/register"
            }

            return true;
        },
    },
});
