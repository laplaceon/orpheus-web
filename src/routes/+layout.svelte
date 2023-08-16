<script lang="ts">
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import favicon from "$lib/assets/favicon.png";
    import { user } from "$lib/auth";
    import { signOut } from "$lib/auth";

</script>

<svelte:head>
	<title>TuneForge</title>
	<html lang="en" />
</svelte:head>

<nav class="navbar">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src={favicon} alt="Logo" width="30" height="24" class="d-inline-block align-text-middle">
            TuneForge
        </a>
        <div class="navbar-expand" id="navbarNav">
            <ul class="navbar-nav">
                {#if $user.token}
                    <li class="nav-item">
                        <button type="button" class="btn btn-link">
                            <a href="/account">Account</a>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn btn-link" on:click={() => signOut()}>
                            Sign out
                        </button>
                    </li>
                {:else}
                    <li class="nav-item">
                        <button type="button" class="btn btn-link">
                            <a href="/signin">Sign in</a>
                        </button>
                    </li>
                {/if}
            </ul>
        </div>
    </div>

</nav>

<div id="content" class="container-fluid">
    <slot />
</div>

<SvelteToast />

<style>
    /* nav.navbar {
        background-color: black;
        color: white;
    } */
</style>