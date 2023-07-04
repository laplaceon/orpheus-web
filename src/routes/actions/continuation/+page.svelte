<script lang="ts">
    import { onMount } from "svelte";
    import AudioTrimmer from "$lib/components/AudioTrimmer.svelte";
    import RangeSlider from "svelte-range-slider-pips";

    import { getActions } from "$lib/api";

    import { bufferToWave } from "$lib/audio_helpers";

    let segmentLength: number = 0;
    
    let cost = {
        amount: 0,
        unit: 0
    };

    let loading: boolean = false;
    let updatingDecoded: boolean = false;
    let decodedSegment: Float32Array;
    let audioCtx: AudioContext;
    let percentCutoff: number = 50;
    let url: string = '';
    let creditsCost: number;
    let unmasked: Float32Array;
    let masked: Float32Array;

    onMount(async () => {
        audioCtx = new window.AudioContext();

        const res = await getActions();
        const actions = await res.json();

        let genreTransfer = actions.filter((action: any) => action.name == "Continue");
        
        if (genreTransfer.length > 0) {
            cost = {
                amount: genreTransfer[0].cost,
                unit: genreTransfer[0].length,
            }
        }
    });

    // $: {
        
    // }

    async function generate() {
        loading = true;
        // await new Promise(() => {
        //     while (updatingDecoded) {
        //     }
        // });
        let audioBuffer = audioCtx.createBuffer(1, decodedSegment.length, 44100);
        audioBuffer.copyToChannel(decodedSegment, 0);
        
        const blob = bufferToWave(audioBuffer);
        url = window.URL.createObjectURL(blob);

        console.log(url);

        loading = false;
    }

    function updateRangeHelper() {
        console.log("Updated");
        let cutoff = Math.floor(percentCutoff * decodedSegment.length / 100);

        unmasked = decodedSegment.slice(0, cutoff);
        masked = decodedSegment.slice(cutoff);
    }

    function updateRange(e: Event) {
        updateRangeHelper();
    }
</script>

<div class="row row-cols-auto m-2">
    <div class="col">
        <h4>Step 1: Choose file and the region to transform</h4>
        <div class="row mb-2">
            <AudioTrimmer bind:segmentLength bind:decodedSegment bind:updatingDecoded />
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
        <h4>Step 2: Choose when to start the continuing</h4>

        <RangeSlider pips all='label' values={[percentCutoff]} disabled={!decodedSegment}  />

        <!-- on:stop={(e) => {updateRange(e)}} -->

        {#if decodedSegment}
            <div class="row">
                <div class="col">
                    <!-- {unmasked.length} -->
                </div>
                <div class="col">
                    <!-- {masked.length} -->
                </div>
            </div>
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
        
        {#if url}
        <audio src={url} controls />
        {/if}
    </div>
</div>