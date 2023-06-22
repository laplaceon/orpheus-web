<script>
    import AudioTrimmer from "../../../components/AudioTrimmer.svelte";
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
    ].map(genre => ({ slug: slugify(genre, { strict: true, lower: true }), text: genre }));

    let generated = [];

    let segmentLength = 0;

</script>

<div class="row row-cols-auto m-2">
    <div class="col">
        <h4>Step 1: Choose file and the region to transform</h4>
        <div class="row">
            <AudioTrimmer />
        </div>

        <p>{segmentLength}</p>
    </div>
    <div class="col">
        <h4>Step 2: Choose genre</h4>
        {#each genres as genre}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="{genre.slug}" id="check_{genre.slug}">
                <label class="form-check-label" for="check_{genre.slug}">{genre.text}</label>
            </div>
        {/each}
    </div>
    <div class="col">
        <h4>Step 3: Generate and download</h4>
        <button class="btn btn-primary">Generate</button>
        <!-- {#each generated as generatedOption}
        {/each} -->
    </div>
</div>