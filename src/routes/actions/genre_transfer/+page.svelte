<script lang="ts">
    import { onMount } from "svelte";
    import AudioTrimmer from "$lib/components/AudioTrimmer.svelte";


    import { getActions, pushGenreTransferActionRequest } from "$lib/api";

    import { bufferToWave } from "$lib/audio_helpers";
    import GenrePicker from "$lib/components/GenrePicker.svelte";

    let segmentLength = 0;
    
    let cost = {
        amount: 0,
        unit: 0
    };

    let loading = false;
    let updatingDecoded = false;
    let decodedSegment: Float32Array;
    let audioCtx: AudioContext;

    let url: string = '';

    let fileReader: FileReader;

    onMount(async () => {
        audioCtx = new window.AudioContext();
        fileReader = new window.FileReader();

        const res = await getActions();
        const actions = await res.json();

        let genreTransfer = actions.filter((action: any) => action.name == "Genre Transfer");
        
        if (genreTransfer.length > 0) {
            cost = {
                amount: genreTransfer[0].cost,
                unit: genreTransfer[0].length,
            }
        }

        fileReader.onloadend = async function() {
            await pushGenreTransferActionRequest(1, fileReader.result);
        }
    });

    let creditsCost: number;

    $: if (cost.amount != 0 && cost.unit != 0) {
        creditsCost = Math.ceil((cost.amount * (segmentLength / cost.unit)) * 100) / 100;
    }

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

        // console.log(selectedGenres);
        loading = false;

        fileReader.readAsDataURL(blob);
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
        <h4>Step 2: Choose genre</h4>
        <GenrePicker />

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