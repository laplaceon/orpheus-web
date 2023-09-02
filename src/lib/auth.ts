import { goto } from "$app/navigation";

export const signIn = async (options) => {
    const callbackUrl = window.location.href;

    const _signInUrl = `/auth/signin?${new URLSearchParams(options)}`;

    const res = await fetch(_signInUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Return-Redirect": "1",
        },

        body: new URLSearchParams({
            callbackUrl,
        }),
    })

    return res.json()
}

export const signOut = async () => {
    const callbackUrl = window.location.href;

    const _signInUrl = `/auth/signout?`;

    const res = await fetch(_signInUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Return-Redirect": "1",
        },

        body: new URLSearchParams({
            callbackUrl,
        }),
    })

    window.location.reload()
}