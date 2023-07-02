<script lang="ts">
    import TimePicker from "./TimePicker.svelte";
    import WaveSurfer from "wavesurfer.js";
    import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js"
    import * as mm from "music-metadata-browser";
    import { toast } from '@zerodevx/svelte-toast'
    import { onMount } from "svelte";

    let segmentRange = [0, 0];
    let fixedSegment = false;
    let fixedSegmentLength = 24;
    let audio_files: FileList;
    let audio_file;
    let isPlaying = false;
    let loading = false;
    let fileReader: FileReader;

    let ws: WaveSurfer;
    let activeRegion: Region;

    export let segmentLength: number;
    export let decodedSegment;
    export let updatingDecoded = false;

    $: segmentLength = segmentRange[1] - segmentRange[0];

    function updateDecodedSegment() {
        const decodingLength = segmentRange[1] * 44100;

        if (decodingLength < ws.getDecodedData()!.length) {
            updatingDecoded = true;

            const decodingIndices = [44100 * segmentRange[0], 44100 * segmentRange[1]];
            let summed = ws.getDecodedData()!.getChannelData(0).slice(...decodingIndices);

            for (let i = 1; i < ws.getDecodedData()!.numberOfChannels; i++) {
                let channel = ws.getDecodedData()!.getChannelData(i).slice(...decodingIndices);

                for (let j = 0; j < decodingLength; j++) {
                    summed[j] = summed[j] + channel[j];
                }
            }

            decodedSegment = summed.map(x => x / ws.getDecodedData()!.numberOfChannels);
            updatingDecoded = false;
            console.log(decodedSegment);
        }
    }

    onMount(() => {
        fileReader = new window.FileReader();
        fileReader.addEventListener("load", function () {
            console.log("file reader loading");
            audio_file = fileReader.result;

            ws.load(audio_file);
        });

        ws = WaveSurfer.create({
            container: '#waveformView',
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            interact: false,
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
            sampleRate: 44100,
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
                segmentRange = [Math.floor(activeRegion.start), Math.floor(activeRegion.end)]
                ws.seekTo(activeRegion.start / ws.getDuration());
            });

            activeRegion.on('update-end', () => {
                updateDecodedSegment();
            });

            segmentRange[0] = 0;
            segmentRange[1] = Math.floor(ws.getDuration() / 2);

            updateDecodedSegment();
        });

        // Track the time
        ws.on('timeupdate', (currentTime) => {
            // When the end of the region is reached
            if (activeRegion && ws.isPlaying() && currentTime >= activeRegion.end) {
                ws.setTime(activeRegion.start);
                togglePlay();
            }
        });

    });

    $: if (audio_files) {
        // Note that `files` is of type `FileList`, not an Array:
        // https://developer.mozilla.org/en-US/docs/Web/API/FileList

        console.log("invoked");

        mm.parseBlob(audio_files[0]).then(metadata => {
            console.log(metadata);

            if (metadata.format.sampleRate == 44100) {
                fileReader.readAsDataURL(audio_files[0]);

                if (ws.isPlaying()) {
                    ws.pause();
                }

                loading = true;
                isPlaying = false;
            } else {
                toast.push('Sorry, but can only process 44.1KHz audio');
            }

        });

        
    }

    $: if (fixedSegment) {
        if (activeRegion != null) {
            activeRegion.setOptions({
                end: activeRegion.start + fixedSegmentLength,
                resize: false,
            });

            segmentRange[1] = activeRegion.end

            updateDecodedSegment();
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
        <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
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