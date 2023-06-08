import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";

export const handle = SvelteKitAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: ""},
                password: {label: "Password", type: "password"}
            }
        })
    ],
});