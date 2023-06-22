<script>
    import RangeSlider from "svelte-range-slider-pips";
    import TimePicker from "./TimePicker.svelte";
    import WaveSurfer from "wavesurfer.js";
    import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js"
    import { onMount } from "svelte";

    let segmentRange = [0, 0];
    let fixedSegment = false;
    let fixedSegmentLength = 24;
    let audio_files;
    let audio_file;
    let isPlaying = false;
    let loading = false;

    let ws;
    let activeRegion;

    $: segmentLength = segmentRange[1] - segmentRange[0];

    onMount(() => {
        ws = WaveSurfer.create({
            container: '#waveformView',
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            interact: false,
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
        })

        const wsRegions = ws.registerPlugin(RegionsPlugin.create());

        ws.on('decode', () => {
            loading = false;
            // Regions
            wsRegions.clearRegions();
            activeRegion = wsRegions.addRegion({
                start: 0,
                end: ws.getDuration() / 2,
                content: 'Transform this part',
                color: 'rgba(255, 0, 200, 0.4)',
            });

            activeRegion.on('update', () => {
                // console.log();
                segmentRange[0] = Math.floor(activeRegion.start);
                segmentRange[1] = Math.floor(activeRegion.end);
                ws.seekTo(segmentRange[0] / ws.getDuration());
            });

            segmentRange[0] = 0;
            segmentRange[1] = Math.floor(ws.getDuration() / 2);
        });

    });

    $: if (audio_files) {
        // Note that `files` is of type `FileList`, not an Array:
        // https://developer.mozilla.org/en-US/docs/Web/API/FileList

        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // console.log(reader.result);
            audio_file = reader.result;

            ws.load(audio_file);

        });

        reader.readAsDataURL(audio_files[0]);
        loading = true;
        isPlaying = false;
    }

    $: if (fixedSegment) {
        if (activeRegion != null) {
            activeRegion.setOptions({
                end: activeRegion.start + fixedSegmentLength,
                resize: false,
            });
        }
        
    } else {
        if (activeRegion != null) {
            activeRegion.setOptions({
                resize: true,
            });
        }
    }

    function togglePlay() {
        if (isPlaying) {
            ws.pause();
        } else {
            ws.play();
        }

        isPlaying = !isPlaying;
    }

</script>

<div id="trimmer">
    <input bind:files={audio_files}
        class="form-control form-control-lg mb-2"
        accept="audio/mpeg, audio/wave, audio/ogg"
        name="audio"
        type="file"
    />

    <div id="waveformView" class="row mb-2">
        {#if loading}
            <span>Loading...</span>
        {/if}
    </div>

    {#if audio_file}
        <div class="row mb-2">
            <div class="col col-auto">
                <button class="btn btn-light" on:click={() => togglePlay()}>
                    {#if isPlaying}
                        ⏸️
                    {:else}
                        ▶️
                    {/if}
                    
                </button>
            </div>
            <div class="col">
                <TimePicker time={segmentRange[0]} />
            </div>
            <div class="col">
                <TimePicker time={segmentRange[1]} />
            </div>
        </div>

        <div class="row">
            <div class="input-group">
                <div class="input-group-text">
                    <input id="fsCheck" class="form-check-input mt-0" type="checkbox" bind:checked={fixedSegment} aria-label="Checkbox for following text input">
                    <label class="form-check-label ms-2" for="fsCheck">
                        Use fixed segment length
                    </label>
                </div>
                <input type="number" class="form-control" aria-label="Text input with checkbox" min=0 bind:value={fixedSegmentLength} disabled={!fixedSegment}>
                <span class="input-group-text">seconds</span>
            </div>          
        </div>
    {/if}

</div>