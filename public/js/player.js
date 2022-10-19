let albumCover = document.getElementById('album-cover');
let musicTitle = document.querySelector('.music-title');

let playPause = document.querySelector('.playpause-music');
let nextmusic = document.querySelector('.next-music');
// let prevmusic = document.querySelector('.prev-music');

let timeSlider = document.querySelector('.t-slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let currentMusic = document.createElement('audio');

let musicIndex = 0;
let isPlaying = false;
let updateTimer;

const playlist = [{
    name: 'Free For',
    img: 'images/Free For.png',
    music: 'music/Free For.mp3'
  },
  {
    name: 'Make Us Never Happen',
    img: 'images/Make Us Never Happen.png',
    music: 'music/Make Us Never Happen.mp3'
  },
  {
    name: 'Twee',
    img: 'images/Twee.png',
    music: 'music/Twee.mp3'
  },
  {
    name: 'Youth Is Wasted On The Young',
    img: 'images/Youth Is Wasted On The Young.png',
    music: 'music/Youth Is Wasted On The Young.mp3'
  },
  {
    name: 'Remember Tonight',
    img: 'images/Remember Tonight.png',
    music: 'music/Remember Tonight.mp3'
  }
];

console.log('player.js served');

loadMusic(musicIndex);

function loadMusic(musicIndex) {
  clearInterval(updateTimer);
  reset();

  currentMusic.src = playlist[musicIndex].music;
  currentMusic.load();
  albumCover.src = playlist[musicIndex].img;
  musicTitle.textContent = playlist[musicIndex].name;

  updateTimer = setInterval(setUpdate, 1000);
  currentMusic.addEventListener('ended', nextmusic);
}

function loadAndPlayMusic(musicIndex){
  loadMusic(musicIndex);
  playMusic();
}

function reset() {
  currentTime.textContent = '00:00';
  totalDuration.textContent = '00:00';
  timeSlider.value = 0;
}

function playMusic() {
  currentMusic.play();
  isPlaying = true;
  playPause.innerHTML = '<i class="fa-solid fa-pause"></i>'
}

function pauseMusic() {
  currentMusic.pause();
  isPlaying = false;
  playPause.innerHTML = '<i class="fa-solid fa-play"></i>'
}

function playPauseMusic() {
  isPlaying ? pauseMusic() : playMusic();
}

function nextMusic() {
  if (musicIndex < playlist.length - 1) {
    musicIndex++;
  } else {
    musicIndex = 0;
  }
  loadMusic(musicIndex);
  playMusic();
}

function prevMusic() {
  if (musicIndex > 0) {
    musicIndex--;
  } else {
    musicIndex = playlist.length - 1;
  }
  loadMusic(musicIndex);
  playMusic();
}

function seekTo() {
  currentMusic.currentTime = currentMusic.duration * (timeSlider.value / 100);
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(currentMusic.duration)) {
    seekPosition = currentMusic.currentTime * (100 / currentMusic.duration);
    timeSlider.value = seekPosition;

    let currentMinutes = Math.floor(currentMusic.currentTime / 60);
    let currentSeconds = Math.floor(currentMusic.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentMusic.duration / 60);
    let durationSeconds = Math.floor(currentMusic.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ':' + currentSeconds;
    totalDuration.textContent = durationMinutes + ':' + durationSeconds;
  }
}
