<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { signIn } from "$lib/auth"
    import { page } from "$app/stores"
    import { z } from 'zod';

    let email: string = '';
    let password: string = '';

    const userCreated = $page.url.searchParams.has("userCreated")

    let cfResponseToken: string = '';

    $: canLogin = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }

    const loginAccountSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    let form;

    function trySignIn() {
        form.classList.add('was-validated');
        if (form.checkValidity()) {
            signIn(email, password, cfResponseToken)
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
                    Your account has been created! Now you can sign in.
                </div>              
            </div>
        {/if}

        <div class="row justify-content-center">
            <form bind:this={form} class="col-md-auto text-center needs-validation" novalidate>
                <input type="email" class="form-control mb-2" placeholder="Email" bind:value={email} required />
                <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} required />
        
                <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />
        
                <div>
                    <button class="btn btn-outline-dark btn-login mt-1" disabled={!canLogin} type="submit" on:click|preventDefault={() => trySignIn()}>
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
