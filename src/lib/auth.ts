import { createUserWithEmail } from "./api";

export const signIn = (email: string, password: string, cf_token: string) => {

    console.log(email, password, cf_token);
}

export const signOut = () => {}

export const registerAccount = (email: string, password: string, cf_token: string) => {
    return createUserWithEmail(email, password, cf_token);
}