<script>
    import { signIn } from "@auth/sveltekit/client"
    import { page } from "$app/stores"

    const actions = {
        login: async ({ cookies, request }) => {
            const data = await request.formData();
            const email = data.get('email');
            const password = data.get('password');

            const user = await db.getUser(email);
            cookies.set('sessionid', await db.createSession(user));

            return { success: true };
        },
        register: async (event) => {
            // TODO register the user
        }
    };
</script>

<form method="post" action={actions}>
    <input class="form-control" type="text" name="email" placeholder="Email" />
    <input class="form-control" type="password" name="password" placeholder="Password" />

    <button type="submit">Sign In</button>
</form>