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
    
    // let audio_file;

    // $: if (audio_file) {
	// 	// Note that `files` is of type `FileList`, not an Array:
	// 	// https://developer.mozilla.org/en-US/docs/Web/API/FileList
	// 	console.log(audio_file);
	// }

    let generated = [];

</script>

<div class="row row-cols-auto m-2">
    <div class="col">
        <h4>Step 1: Choose file and the region to transform</h4>
        <div class="row">
            <!-- <input bind:audio_file
                accept="image/png, image/jpeg"
                id="avatar"
                name="avatar"
                type="file"
            /> -->
        
            <AudioTrimmer />
        
        </div>
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
        <h4>Step 3: Choose output and download</h4>
        {#each generated as generatedOption}
        {/each}
    </div>
</div>