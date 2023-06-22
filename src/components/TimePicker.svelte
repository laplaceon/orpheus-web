<script>
    export let time;

    $: timeParts = new Date(time * 1000).toISOString().slice(11, 19).split(":").reverse();

</script>

<div class="input-group">
    {#if timeParts[2] > 0}
        <input type="text" class="form-control" placeholder="{timeParts[2]}" aria-label="Hour">
        <span class="input-group-text">:</span>
    {/if}
    <input type="text" class="form-control" value="{timeParts[1]}" placeholder="Minute" aria-label="Minute">
    <span class="input-group-text">:</span>
    <input type="text" class="form-control" value="{timeParts[0]}" placeholder="Minute" aria-label="Second">
</div>