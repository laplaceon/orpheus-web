<script>
    import slugify from "slugify";

    const genres = [
        "Classical",
        "Electronic",
        "Hip Hop",
        "Jazz",
        "Metal",
        "Pop",
        "R&B",
        "Rock"
    ].map(genre => ({ slug: slugify(genre, { strict: true, lower: true }), text: genre, selected: false }));

    $: selectedGenres = genres.filter(genre => genre.selected).map(genre => genre.slug);

</script>

{#each genres as genre}
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="{genre.slug}" id="check_{genre.slug}" bind:checked={genre.selected}>
        <label class="form-check-label" for="check_{genre.slug}">{genre.text}</label>
    </div>
{/each}
{#if selectedGenres.length >= 3}
    <p>Selecting 3 or more genres might not sound as coherent compared to 1 or 2 genres.</p>
{/if}