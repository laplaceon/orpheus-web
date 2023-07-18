import { SvelteKitAuth } from "@auth/sveltekit"
import Discord from "@auth/core/providers/discord"
import { createUserWithEmail, getUserWithEmail } from "$lib/api";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const SECRET: string = "285c85ccc20fb129f836a9a9f458234a";
const JWT_SECRET: string = "23b0a759b4c131537cd5366d5e96f0b3";

async function preauth({ event, resolve }) {
    if (event.request.url.includes("?turnstile_key=")) {
        const auth_url = new URL(event.request.url);
        event.locals.turnstile_key = auth_url.searchParams.get("turnstile_key")!;
    }
    
    return resolve(event);
}


const authHandle = SvelteKitAuth(async (event) => {
  const authOptions = {
    providers: [Discord({ clientId: "1116791237484224602", clientSecret: "qKI4ldfTM_6u3hii0NNu1Uh31GKVecXV" })],
    secret: SECRET,
    trustHost: true,
    callbacks: {
      async signIn({ profile }) {
          let res = await getUserWithEmail(profile?.email);
      
          console.log("clb", event.locals.turnstile_key);
      
          if (res.status !== 200) {
              let signUpRes = await createUserWithEmail(profile!.email!, event.locals.turnstile_key);
              
              const body = await signUpRes.json();
      
              if (res.status == 201) {
                  event.locals.jwt = body.token;
                  return true;
              }
      
              return false;
          } else {
              const body = await res.json();
              event.locals.jwt = body.token;
              let session = await event.locals.getSession();
      
      
              return true;
          }
      }
    }
    
  }
  return authOptions
}) satisfies Handle;




export const handle = sequence(preauth, authHandle);