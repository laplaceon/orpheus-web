<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';

    let cfResponseToken: string = '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }
</script>

<Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />