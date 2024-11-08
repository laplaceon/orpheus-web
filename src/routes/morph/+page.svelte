<script lang="ts">
    import { onMount } from "svelte";
    import AudioTrimmer from "$lib/components/AudioTrimmer.svelte";

    import { getActions, pushGenreTransferActionRequest } from "$lib/api";

    import { bufferToWave } from "$lib/audio_helpers";
    import TagPicker from "$lib/components/TagPicker.svelte";

    import { page } from '$app/stores';

    import { round } from "$lib/audio_helpers";

    import { toast } from '@zerodevx/svelte-toast'

    let segmentLength = 0;
    
    let cost = {
        amount: 0,
        unit: 0
    };

    const genres = [
        "Classical",
        "Electronic",
        "Hip Hop",
        "Jazz",
        "Metal",
        "Pop",
        "R&B",
        "Rock"
    ];

    let selectedTags = [];

    let loading = false;
    let updatingDecoded = false;
    let decodedSegment: Float32Array;
    let audioCtx: AudioContext;

    let url: string = '';

    let fileReader: FileReader;

    let worker;

    onMount(async () => {
        audioCtx = new window.AudioContext();
        fileReader = new window.FileReader();

        const res = await getActions();
        const actions = await res.json();

        let genreTransfer = actions.filter((action: any) => action.name == "Morph");
        
        if (genreTransfer.length > 0) {
            cost = {
                amount: genreTransfer[0].cost,
                unit: genreTransfer[0].length,
            }
        }

        // worker = new Worker('encoderWorker.js');

        // worker.addEventListener('message', function(e) {
        //     var mp3Blob = e.data;
        //     console.log('Received mp3 blob:', mp3Blob);
        // }, false);

        fileReader.onloadend = async function() {
            // const historyItem = await pushGenreTransferActionRequest($page.data.user.user_id, fileReader.result, $page.data.user.token);
            // const historyItemBody = await historyItem.json();
            // if (historyItem.status == 201) {
                // await checkHistoryStatus(historyItemBody.history_id)
            // } else {
                // toast.push(historyItemBody.error);
            // }

            console.log(selectedTags);
            
            loading = false;
        }
    });

    // async function checkHistoryStatus(history_id: number) {
    //     if (!historyId) return;

    //     const response = await fetch(`/api/history/${historyId}`);
    //     const result = await response.json();
        
    //     historyStatus = result.status;

    //     if (historyStatus !== 'complete') {
    //         setTimeout(checkHistoryStatus, 5000); // Check every 5 seconds
    //     }
    // }

    let creditsCost: number;

    $: if (cost.amount != 0 && cost.unit != 0) {
        creditsCost = round((cost.amount * segmentLength * 10) / cost.unit, 0.01);
    }

    $: ready = selectedTags.length > 0 && decodedSegment?.length > 0

    async function generate() {
        loading = true;
        // await new Promise(() => {
        //     while (updatingDecoded) {
        //     }
        // });
        let audioBuffer = audioCtx.createBuffer(1, decodedSegment.length, 44100);
        audioBuffer.copyToChannel(decodedSegment, 0);
        
        const blob = bufferToWave(audioBuffer);
        // url = window.URL.createObjectURL(blob);

        
        // To start the conversion:
        // worker.postMessage({
        //     cmd: 'convert',
        //     channels: adata[0],
        //     sampleRate: adata[1],
        //     samples: adata[2]
        // });

        // console.log(selectedGenres);

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
        <TagPicker tags={genres} bind:selectedTags />

    </div>
    <div class="col">
        <h4>Step 3: Generate and download</h4>
        <button class="btn btn-primary" disabled={loading || !ready} on:click={() => generate()}>
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