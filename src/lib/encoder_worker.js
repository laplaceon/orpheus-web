import lamejs from "lamejs";

const mp3enc = new lamejs.Mp3Encoder(1, 44100, 320);

self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'convert':
            var result = wavToMp3(data.channels, data.sampleRate, data.samples);
            self.postMessage(result);
            break;
        default:
            self.postMessage('Unknown command');
    }
}, false);

function wavToMp3(channels, sampleRate, samples) {
    var buffer = [];
    var remaining = samples.length;
    var samplesPerFrame = 1152;
    for (var i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
        var mono = samples.subarray(i, i + samplesPerFrame);
        var mp3buf = mp3enc.encodeBuffer(mono);
        if (mp3buf.length > 0) {
            buffer.push(new Int8Array(mp3buf));
        }
        remaining -= samplesPerFrame;
    }
    var d = mp3enc.flush();
    if(d.length > 0){
        buffer.push(new Int8Array(d));
    }

    return new Blob(buffer, {type: 'audio/mp3'});
}