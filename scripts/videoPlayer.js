export const videoPlayerInit = () => {
    console.log('vodeoPlayer init');
    // video-player
    // video-button__play
    // video-button__stop
    // video-time__passed
    // video-progress
    // video-time__total

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoButtonFullscreen = document.querySelector('.video-button__fullscreen');
    const videoVolume = document.querySelector('.video-volume');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    }

    videoPlayer.volume = videoVolume.value / 100;

    const startStopPlayer = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

    }

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    videoButtonFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    })

    videoPlayer.addEventListener('click', startStopPlayer);
    videoButtonPlay.addEventListener('click', startStopPlayer);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    const addZero = n => n < 10 ? '0' + n : n;

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);
        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoProgress.value = currentTime / duration * 100;

        videoTimeTotal.textContent = addZero(minuteTotal) + ":" + addZero(secondsTotal);
        videoTimePassed.textContent = addZero(minutePassed) + ":" + addZero(secondsPassed);
    });

    videoProgress.addEventListener('input', event => {
        const value = videoProgress.value;
        const duration = videoPlayer.duration;
        videoPlayer.currentTime = duration * value / 100;
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });
}