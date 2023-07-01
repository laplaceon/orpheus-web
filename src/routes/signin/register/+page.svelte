<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { createUserWithEmail } from '$lib/api';
    import { redirect } from '@sveltejs/kit';

    let email: string = 'awe';
    let cfResponseToken: string = '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }

    async function signUp() {
        let res = await createUserWithEmail(email, cfResponseToken);

        console.log(res);
        
        if (res.status == 201) {
            console.log("success");
            
            window.location.href = '/login';
        } else {
            console.log("error");
        }
    }

    $: readyToRegister = (cfResponseToken != "") && (email != "")
</script>

<input type="text" class="form-control mb-2" placeholder="Email" value="{email}" disabled />
<Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />
<button class="btn btn-primary" disabled={!readyToRegister} on:click={() => signUp()}>Create an account</button>