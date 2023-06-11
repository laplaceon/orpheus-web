<script>
    import { signIn } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
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
        <div class="row m-2">
            <button class="btn btn-outline-dark btn-login" on:click={() => signIn("google")}>
                <img alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Sign in with Google
            </button>
        </div>
        <div class="row m-2">
            <button class="btn btn-outline-dark btn-login" on:click={() => signIn("discord")}>
                <img alt="Discord sign-in" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg" />
                Sign in with Discord
            </button>
        </div>
    </div>  
</div>
