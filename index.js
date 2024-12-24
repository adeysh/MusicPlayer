const song = document.getElementById('song');
const range = document.getElementById('range');
const ctrlIcon = document.getElementById('ctrlIcon');
const songInitialTime = document.getElementById('songInitialTime');
const songFinalTime = document.getElementById('songFinalTime');

song.onloadedmetadata = function () {
    range.max = song.duration;
    range.value = song.currentTime;
};

function pauseSong() {

    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if (song.play()) {
    setInterval(() => {
        range.value = song.currentTime;
        seekUpdate();
    }, 500);
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(song.duration)) {
        seekPosition = song.currentTime * (100 / song.duration);
        range.value = seekPosition;

        let currentMinutes = Math.floor(song.currentTime / 60);
        let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(song.duration / 60);
        let durationSeconds = Math.floor(song.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        songInitialTime.textContent = currentMinutes + ":" + currentSeconds;
        songFinalTime.textContent = durationMinutes + ":" + durationSeconds;
    }
}

range.onchange = function () {
    song.play();
    song.currentTime = range.value;
};

song.pause();