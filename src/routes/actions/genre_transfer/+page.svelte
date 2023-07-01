<script lang="ts">
    import { onMount } from "svelte";
    import AudioTrimmer from "$lib/components/AudioTrimmer.svelte";
    import slugify from "slugify";

    import { getActions } from "$lib/api";

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

    let segmentLength = 0;
    
    let cost = {
        amount: 0,
        unit: 0
    };

    let loading = false;

    onMount(async () => {
        const res = await getActions();
        const actions = await res.json();

        let genreTransfer = actions.filter((action: any) => action.name == "Genre Transfer");
        
        if (genreTransfer.length > 0) {
            cost = {
                amount: genreTransfer[0].cost,
                unit: genreTransfer[0].length,
            }
        }
    });

    let creditsCost: number;

    $: if (cost.amount != 0 && cost.unit != 0) {
        creditsCost = Math.ceil((cost.amount * (segmentLength / cost.unit)) * 100) / 100;
    }

    $: selectedGenres = genres.filter(genre => genre.selected).map(genre => genre.slug);

    async function generate() {
        loading = true;
        await new Promise(r => setTimeout(r, 1000));
        console.log(selectedGenres);
        loading = false;
    }

</script>

<div class="row row-cols-auto m-2">
    <div class="col">
        <h4>Step 1: Choose file and the region to transform</h4>
        <div class="row mb-2">
            <AudioTrimmer bind:segmentLength />
        </div>

        {#if creditsCost}
            <div class="row">
                <p>
                    The part you selected for transformation is <strong>{segmentLength}</strong> seconds long. 
                    This will use an estimated <strong>{creditsCost}</strong> credits.
                </p>
            </div>
        {/if}
        
    </div>
    <div class="col">
        <h4>Step 2: Choose genre</h4>
        {#each genres as genre}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="{genre.slug}" id="check_{genre.slug}" bind:checked={genre.selected}>
                <label class="form-check-label" for="check_{genre.slug}">{genre.text}</label>
            </div>
        {/each}
        {#if selectedGenres.length >= 3}
            <p>Selecting 3 or more genres might not sound as coherent compared to 1 or 2 genres.</p>
        {/if}
    </div>
    <div class="col">
        <h4>Step 3: Generate and download</h4>
        <button class="btn btn-primary" disabled={loading} on:click={() => generate()}>
            {#if loading}
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Generating...
            {:else}
                Generate
            {/if}
            
        </button>
        <!-- {#each generated as generatedOption}
        {/each} -->
    </div>
</div>