<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { signIn } from "$lib/auth"
    import { page } from "$app/stores"

    let email: string = '';
    let password: string = '';

    const userCreated = $page.url.searchParams.has("userCreated")

    let cfResponseToken: string = '';

    $: canLogin = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }
</script>

<style>
    .btn-login {
        text-transform: none;
        padding: 12px;
    }

    /* .btn-login > img {
        width: 20px;
        margin-bottom: 3px;
        margin-right: 5px;
    } */
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
            <div class="col-md-auto text-center">
                <input type="text" class="form-control mb-2" placeholder="Email" bind:value={email} />
                <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} />
        
                <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />
        
                <div>
                    <button class="btn btn-outline-dark btn-login mt-1" disabled={!canLogin} type="submit" on:click={() => signIn( email, password, cfResponseToken )}>
                        Sign in
                    </button>
                    <p class="mt-1">
                        or you can register <a href="/signin/register">here</a>
                    </p>
                </div>

            </div>
        
        </div>
        
    </div>
</div>
