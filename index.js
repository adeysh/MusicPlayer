const song = document.getElementById('song');
const range = document.getElementById('range');
const ctrlIcon = document.getElementById('ctrlIcon');

song.onloadedmetadata = function () {
    range.max = song.duration;
    range.value = song.currentTime;
    updateRangeBackground();
};

console.log(song.duration);

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

function updateRangeBackground() {
    const playedPercent = (range.value / range.max) * 100;
    range.style.backgroundColor = `linear-gradient(to right,#003049 ${playedPercent}, #4caf50 ${playedPercent})`;
}

if (song.play()) {
    setInterval(() => {
        range.value = song.currentTime;
    }, 5000);
    console.log(range.max);
}

range.onchange = function () {
    song.play();
    song.currentTime = range.value;
    updateRangeBackground();
};

song.pause();