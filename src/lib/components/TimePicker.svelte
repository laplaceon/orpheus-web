<script>
    export let time;

    $: timeParts = new Date(time * 1000).toISOString().slice(11, 19).split(":").reverse();

</script>

<div class="input-group">
    {#if timeParts[2] > 0}
        <input type="text" class="form-control" placeholder="{timeParts[2]}" aria-label="Hour" readonly>
        <span class="input-group-text">:</span>
    {/if}
    <input type="number" class="form-control" value="{timeParts[1]}" min=0 placeholder="Minute" aria-label="Minute" readonly>
    <span class="input-group-text">:</span>
    <input type="number" class="form-control" value="{timeParts[0]}" min=0 placeholder="Minute" aria-label="Second" readonly>
</div>