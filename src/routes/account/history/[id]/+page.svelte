<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    import { getUserHistoryItem } from '$lib/api';

    let historyItem: HistoryItem;

    onMount(async () => {
        const res = await getUserHistoryItem(Number.parseInt($page.params.id));
        historyItem = await res.json();
        console.log(historyItem);
    });
</script>

<p>
    <!-- {historyItem.id} -->
</p>