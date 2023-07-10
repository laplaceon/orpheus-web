<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { signIn } from "@auth/sveltekit/client"
    import { page } from "$app/stores"

    const userCreated = $page.url.searchParams.has("userCreated")

    let cfResponseToken: string = '';

    $: canLogin = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }

    function signInW(provider) {
        signIn(provider, null, {turnstile_key: cfResponseToken});
    }
</script>

<style>
    .btn-login {
        text-transform: none;
        padding: 12px;
    }

    .btn-login > img {
        width: 20px;
        margin-bottom: 3px;
        margin-right: 5px;
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

        <!-- <div class="row m-2">
            <button class="btn btn-outline-dark btn-login" on:click={() => signIn("google")}>
                <img alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Sign in with Google
            </button>
        </div> -->
        <div class="row m-2">
            <button class="btn btn-outline-dark btn-login" disabled={!canLogin} on:click={() => signInW("discord")}>
                <img alt="Discord sign-in" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg" />
                Sign in with Discord
            </button>
        </div>
    </div>
    <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />
</div>
