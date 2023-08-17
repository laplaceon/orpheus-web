<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { registerAccount } from '$lib/auth';
    import { z } from 'zod';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let password_confirm = '';
    let cfResponseToken = '';

    $: canRegister = cfResponseToken != '';

    function setCfToken(event: CustomEvent) {
        cfResponseToken = event.detail.token
    }

    let form;

    const registerAccountSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        password_confirm: z.string(),
    }).superRefine(({password, password_confirm}, ctx) => {
        if ((password !== password_confirm) || (password_confirm == "")) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords do not match",
                path: ["password_confirm"]
            });
        }
    });

    let errorsList: string[] = [];

    const inputMap = {
        "email": 0,
        "password": 1,
        "password_confirm": 2
    }
    
    async function tryRegisterAccount() {
        const result = registerAccountSchema.safeParse({email, password, password_confirm});
        
        let invalidItems = new Set();

        if (!result.success) {
            const errors = result.error.issues;
            let errorMessages: string[] = []
            errors.forEach(item => {
                errorMessages.push(item.message);
                invalidItems.add(inputMap[item.path[0]]);
            });

            errorsList = errorMessages;

            for (let i = 0; i < Object.keys(inputMap).length; i++) {
                if (invalidItems.has(i)) {
                    form[i].classList.add("is-invalid");
                } else {
                    form[i].classList.add("is-valid");
                }
            }
        } else {
            errorsList = [];

            for (let i = 0; i < Object.keys(inputMap).length; i++) {
                form[i].classList.remove("is-invalid");
                form[i].classList.add("is-valid");
            }

            let response = await registerAccount(email, password, cfResponseToken);
            
            if (response.status != 201) {
                let body = await response.json();
                errorsList = [body.error];
            } else {
                errorsList = [];

                goto("/signin?userCreated")
            }
        }
    }
</script>

<div class="row justify-content-center">
    <form bind:this={form} class="col-md-auto text-center needs-validation" novalidate>
        {#if errorsList.length > 0}
            <div class="row justify-content-start">
                <div class="alert alert-danger" role="alert">

                    <ul>
                        {#each errorsList as error}
                            <li>{error}</li>
                        {/each}
                    </ul>
                </div>              
            </div>
        {/if}
        <input type="email" class="form-control mb-2" placeholder="Email" bind:value={email} required />
        <input type="password" class="form-control mb-2" placeholder="Password" bind:value={password} required />
        <input type="password" class="form-control mb-2" placeholder="Confirm Password" bind:value={password_confirm} required />

        <Turnstile siteKey="0x4AAAAAAAGIT3J8MSaALfWK" on:turnstile-callback={setCfToken} />

        <button class="btn btn-outline-dark btn-login mt-1" disabled={!canRegister} on:click|preventDefault|stopPropagation={() => tryRegisterAccount()}>
            Register account
        </button>
    </form>
</div>
