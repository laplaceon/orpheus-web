<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { user, signIn, signInWithToken } from "$lib/auth"
    import { page } from "$app/stores"
    import { z } from 'zod';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        if ($user.token) {
            goto("/");
        }
    })


    let email: string = '';
    let password: string = '';

    const userCreated = $page.url.searchParams.has("userCreated")

    let cfResponseToken: string = '';

    $: canLogin = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }

    let turnstile: Turnstile;

    let signinErrors = [];

    const signinAccountSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    let form;

    const inputMap = {
        "email": 0,
        "password": 1
    }

    async function trySignIn() {
        const result = signinAccountSchema.safeParse({email, password});

        let invalidItems = new Set();

        if (!result.success) {
            const errors = result.error.issues;
            let errorMessages: string[] = []
            errors.forEach(item => {
                errorMessages.push(item.message);
                invalidItems.add(inputMap[item.path[0]]);
            });

            signinErrors = errorMessages;

            for (let i = 0; i < Object.keys(inputMap).length; i++) {
                if (invalidItems.has(i)) {
                    form[i].classList.add("is-invalid");
                } else {
                    form[i].classList.add("is-valid");
                }
            }

            turnstile.reset()
        } else {
            signinErrors = [];
            
            for (let i = 0; i < Object.keys(inputMap).length; i++) {
                form[i].classList.remove("is-invalid");
                form[i].classList.add("is-valid");
            }

            let response = await signIn(email, password, cfResponseToken);
            let body = await response.json();
            
            if (response.status != 200) {     
                signinErrors = [body.error];
                turnstile.reset();
            } else {
                signinErrors = [];

                signInWithToken(body.token);

                goto("/");
            }
        }
    }
    
</script>

<style>
    .btn-login {
        text-transform: none;
        padding: 12px;
    }
</style>

<div class="row justify-content-md-center">
    <div class="col-md-auto">
        {#if userCreated}
            <div class="row">
                <div class="alert alert-primary" role="alert">
                    Your account has been created! Now you can sign in. In order to use any features, you must verify your email address.
                </div>              
            </div>
        {/if}

        {#if signinErrors.length > 0}
            <div class="row">
                <div class="alert alert-danger" role="alert">
                    <ul>
                        {#each signinErrors as signinError}
                            <li>{signinError}</li>
                        {/each}
                    </ul>
                </div>              
            </div>
        {/if}

        <div class="row justify-content-center">
            <form bind:this={form} class="col-md-auto text-center needs-validation" novalidate>
                <input type="email" class="form-control mb-2" placeholder="Email" bind:value={email} required />
                <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} required />
        
                <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" bind:this={turnstile} on:turnstile-callback={setCfToken} />
        
                <div>
                    <button class="btn btn-outline-dark btn-login mt-1" disabled={!canLogin} type="submit" on:click|preventDefault|stopPropagation={() => trySignIn()}>
                        Sign in
                    </button>
                    <p class="mt-1">
                        or you can register <a href="/signin/register">here</a>
                    </p>
                </div>

            </form>
        
        </div>
        
    </div>
</div>
