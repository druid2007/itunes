export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioPlayer = document.querySelector('.audio-player');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioButtonNext = document.querySelector('.audio-button__next');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioProgress = document.querySelector('.audio-progress');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioVolume = document.querySelector('.audio-volume');


    const playList = ['hello', 'flow', 'speed'];

    let tarckIndex = 0;

    audioPlayer.volume = audioVolume.value / 100;


    const startStopPlayer = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            pauseOnTab();
        } else {
            audioPlayer.pause();
            audioPlayer.removeEventListener('timeupdate', addChangeTabEvent);
        }

    }

    const toggleIcon = () => {
        if (audioPlayer.paused) {
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        } else {
            audio.classList.add('play');
            audioButtonPlay.classList.remove('fa-play');
            audioButtonPlay.classList.add('fa-pause');
        }
    }

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[tarckIndex];
        audioPlayer.src = `audio/${track}.mp3`;
        audioImg.src = `audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (!isPlayed) {
            startStopPlayer();
        }

        // startStopPlayer();

    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        const track = playList[tarckIndex];
        if (target.classList.contains('audio-button__play')) {
            startStopPlayer();
            audioHeader.textContent = track.toUpperCase();
            // loadTrack();
        }

        if (target.classList.contains('audio-button__prev')) {
            if (tarckIndex !== 0) {
                tarckIndex--;
            } else tarckIndex = playList.length - 1;
            loadTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            if (tarckIndex !== (playList.length - 1)) {
                tarckIndex++;
            } else tarckIndex = 0;
            loadTrack();
        }

    });

    const addZero = n => n < 10 ? '0' + n : n;

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        let minutePassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';
        let minuteTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        const progress = currentTime / duration * 100;
        audioProgressTiming.style.width = progress + '%'
        audioTimeTotal.textContent = (addZero(minuteTotal) + ":" + addZero(secondsTotal));
        audioTimePassed.textContent = addZero(minutePassed) + ":" + addZero(secondsPassed);

    });

    audioPlayer.addEventListener('ended', () => {
        if (tarckIndex !== (playList.length - 1)) {
            tarckIndex++;
        } else tarckIndex = 0;
        loadTrack();
        startStopPlayer();
    });

    audioProgress.addEventListener('click', event => {
        const target = event.target;
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = x / allWidth;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = duration * progress;

        // console.log(event);
    });






    const addChangeTabEvent = () => {
        if (!audio.classList.contains('active')) {
            console.log('stop');
            startStopPlayer();
            audioPlayer.removeEventListener('timeupdate', addChangeTabEvent);
        }
    }

    const pauseOnTab = () => {
        // console.log('add');
        audioPlayer.addEventListener('timeupdate', addChangeTabEvent);
    };

    audioPlayer.addEventListener('play', toggleIcon);
    audioPlayer.addEventListener('pause', toggleIcon);

    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
    });



}