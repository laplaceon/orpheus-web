<script lang="ts">
    import slugify from "slugify";
    import { onMount } from 'svelte';

    export let tags;
    let tagSlugs = [];

    onMount(() => {
        tagSlugs = tags.map(tag => ({ slug: slugify(tag, { strict: true, lower: true }), text: tag, selected: false }));
    });

    $: selectedTags = tagSlugs.filter(tag => tag.selected).map(tag => tag.slug);

</script>

{#each tagSlugs as tag}
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="{tag.slug}" id="check_{tag.slug}" bind:checked={tag.selected}>
        <label class="form-check-label" for="check_{tag.slug}">{tag.text}</label>
    </div>
{/each}
{#if selectedTags.length >= 3}
    <p>Selecting 3 or more tags might not sound as coherent compared to 1 or 2.</p>
{/if}