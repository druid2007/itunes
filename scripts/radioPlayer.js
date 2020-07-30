export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;
    audio.volume = radioVolume.value / 100;

    console.log(radio);

    const startStopPlayer = () => {
        if (audio.paused) {
            audio.play();
            pauseOnTab();
        } else {
            audio.pause();
            audio.removeEventListener('timeupdate', addChangeTabEvent);
        }
        toggleIcon();
    }

    const toggleIcon = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
        const title = elem.querySelector('.radio-name').textContent;
        radioHeader.textContent = title;
        const img = elem.querySelector('.radio-img').src;
        radioCoverImg.src = img;
    }

    radioNavigation.addEventListener('change', (event) => {
        const item = event.target;
        const parrent = item.closest('.radio-item');
        selectItem(parrent);
        // console.log(parrent);
        audio.src = item.dataset.radioStantion;
        audio.play();
        radioStop.disabled = false;
        toggleIcon();
        pauseOnTab();

    });

    const addChangeTabEvent = () => {
        const parrent = radio;
        if (!radio.classList.contains('active')) {
            // console.log('stop');
            startStopPlayer();
            audio.removeEventListener('timeupdate', addChangeTabEvent);
        }
    }

    const pauseOnTab = () => {
        // console.log('add');
        audio.addEventListener('timeupdate', addChangeTabEvent);
    };

    radioStop.addEventListener('click', startStopPlayer);

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    });

}