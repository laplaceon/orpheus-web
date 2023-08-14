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
    
    let form;

    function tryRegisterAccount() {
        form.classList.add('was-validated');
        if (form.checkValidity()) {
            registerAccount(email, password, cfResponseToken);
        }
    }
</script>

<div class="row justify-content-center">
    <form bind:this={form} class="col-md-auto text-center needs-validation" novalidate>
        <input type="text" class="form-control mb-2" placeholder="Email" bind:value={email} required />
        <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} required />
        <input type="password" class="form-control mb-2" placeholder="Confirm Password" bind:value={password_confirm} required />

        <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />

        <button class="btn btn-outline-dark btn-login mt-1" disabled={!canRegister} on:click={() => { tryRegisterAccount() }}>
            Register account
        </button>
    </form>
</div>
