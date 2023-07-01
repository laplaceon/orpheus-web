<script lang="ts">
    import { signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<svelte:head>
	<title>TuneForge</title>
	<html lang="en" />
</svelte:head>

<nav class="navbar">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">TuneForge</a>
        <div class="navbar-expand" id="navbarNav">
            <ul class="navbar-nav">
                {#if $page.data.session}
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