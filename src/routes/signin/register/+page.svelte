<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { registerAccount } from '$lib/auth';

    let email = '';
    let password = '';
    let password_confirm = '';
    let cfResponseToken = '';

    $: canRegister = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }
</script>

<div class="row justify-content-center">
    <div class="col-md-auto text-center">
        <input type="text" class="form-control mb-2" placeholder="Email" bind:value={email} />
        <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} />
        <input type="password" class="form-control mb-2" placeholder="Confirm Password" bind:value={password_confirm} />

        <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />

        <button class="btn btn-outline-dark btn-login mt-1" disabled={!canRegister} on:click={() => { registerAccount(email, password, cfResponseToken) }}>
            Register account
        </button>
    </div>

</div>
