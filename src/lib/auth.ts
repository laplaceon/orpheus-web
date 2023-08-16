import { createUserWithEmail, getUserWithEmail } from "./api";

import { persisted } from "svelte-local-storage-store";

export const user = persisted('user', {});

export const signIn = (email: string, password: string, cf_token: string) => {
    return getUserWithEmail(email, password, cf_token);
}

export const signInWithToken = (token: string) => {
    user.set({ token })
}

export const signOut = () => {
    user.set({})
}

export const registerAccount = (email: string, password: string, cf_token: string) => {
    return createUserWithEmail(email, password, cf_token);
}