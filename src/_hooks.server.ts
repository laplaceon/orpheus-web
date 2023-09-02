import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";
import type { Handle } from "@sveltejs/kit";

export const handle = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [
            Credentials({
                async authorize(credentials, request) {
                    console.log(request.state)
                    // console.log(credentials)

                    // let response = await signIn(email, password, cfResponseToken);
                    // let body = await response.json();
                    
                    // if (response.status != 200) {     
                    //     signinErrors = [body.error];
                    //     turnstile.reset();
                    // } else {
                    //     signinErrors = [];
        
                    //     goto("/");
                    // }

                    return {"id": 1};
                }
            })
        ],
        debug: true,
        secret: "c73445a4bbc86d3be922cf327260273b",
        trustHost: true
    };

    return authOptions;
}) satisfies Handle;
