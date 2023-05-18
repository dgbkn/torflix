window.onkeydown = vidCtrl;


Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

function vidCtrl(e) {
    const vids = document.getElementsByTagName('video');
    var vid = null;
    vids.forEach(video => {
        if (video.playing) {
            vid = video;
        }

    });

    if (vid == null) {
        return;
    }

    const key = e.code;

    if (key === 'ArrowLeft') {
        vid.currentTime -= 5;
        if (vid.currentTime < 0) {
            vid.pause();
            vid.currentTime = 0;
        }
    } else if (key === 'ArrowRight') {
        vid.currentTime += 5;
        if (vid.currentTime > vid.duration) {
            vid.pause();
            vid.currentTime = 0;
        }
    } else if (key === 'Space') {
        if (vid.paused || vid.ended) {
            vid.play();
        } else {
            vid.pause();
        }
    }
}