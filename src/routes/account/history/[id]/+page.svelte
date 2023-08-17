<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    import { getUserHistoryItem } from '$lib/api';
    import { user } from "$lib/auth";

    let historyItem: HistoryItem;

    onMount(async () => {
        const res = await getUserHistoryItem(Number.parseInt($page.params.id), $user.token);
        historyItem = await res.json();
    });
</script>

<a href="/account">View All History</a>

<p>
    {#if historyItem}
        <ul>
            <li>{historyItem.action_name}</li>
            <li>{historyItem.cost}</li>
            <li>{historyItem.status}</li>
            <li>{historyItem.created_at}</li>
        </ul>
    {/if}
</p>