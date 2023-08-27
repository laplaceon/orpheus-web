import { createUserWithEmail, getUserWithEmail } from "./api";

export const signIn = (email: string, password: string, cf_token: string) => {
    return getUserWithEmail(email, password, cf_token);
}

export const registerAccount = (email: string, password: string, cf_token: string) => {
    return createUserWithEmail(email, password, cf_token);
}