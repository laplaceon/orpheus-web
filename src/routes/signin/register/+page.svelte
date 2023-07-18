<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';

    let email = '';
    let password = '';
    let password_confirm = '';
    let cfResponseToken = '';

    $: canRegister = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }
</script>

<div class="row justify-content-md-center">
    <div class="col-md-auto">
        <!-- {#if userCreated}
            <div class="row">
                <div class="alert alert-primary" role="alert">
                    Your account has been created! Now you can sign in.
                </div>              
            </div>
        {/if} -->

        <!-- <div class="row m-2">
            <button class="btn btn-outline-dark btn-login" disabled={!canLogin} on:click={() => signInW("discord")}>
                <img alt="Discord sign-in" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg" />
                Sign in with Discord
            </button>
        </div> -->

        <!-- <input type="text" class="form-control mb-2" placeholder="Email" bind:value={email} />
        <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} />
        <input type="password" class="form-control mb-2" placeholder="Confirm Password" bind:value={password_confirm} />

        <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />

        <button class="btn btn-outline-dark btn-login" on:click={() => {}}>
            Sign In
        </button> -->

        
    </div>

    
    
</div>
