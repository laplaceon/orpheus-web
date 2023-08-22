import { goto } from "$app/navigation";
import jwtDecode from "jwt-decode";
import { createUserWithEmail, getUserWithEmail } from "./api";

import { persisted } from "svelte-local-storage-store";

export const user = persisted('user', {});

export const signIn = (email: string, password: string, cf_token: string) => {
    return getUserWithEmail(email, password, cf_token);
}

export const signInWithToken = (token: string) => {
    user.set({ 
        token, 
        user: jwtDecode(token),
    })
}

export const signOut = () => {
    user.set({})
    goto("/")
}

export const registerAccount = (email: string, password: string, cf_token: string) => {
    return createUserWithEmail(email, password, cf_token);
}