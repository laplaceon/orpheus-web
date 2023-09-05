<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    import { getActionHistoryItem } from '$lib/api';

    let historyItem: HistoryItem;

    onMount(async () => {
        const res = await getActionHistoryItem(Number.parseInt($page.params.id), $page.data.user.token);
        historyItem = await res.json();
    });
</script>

<a href="/account">View All History</a>

<p>
    {#if historyItem}
        <ul>
            <li>Name: {historyItem.action_name}</li>
            <li>Cost: {historyItem.cost}</li>
            <li>Status: {historyItem.status}</li>
            <li>Created: {historyItem.created_at}</li>
        </ul>
    {/if}
</p>