// slider
const slider =  [...document.querySelectorAll('.slider img')];

let slideImageIndex = 0;

const changeSlide = ()=> {
    slider[slideImageIndex].classList.toggle('active');
    if(slideImageIndex >= slider.length - 1) {
        slideImageIndex = 0;
    } else {
        slideImageIndex++;
    }
    slider[slideImageIndex].classList.toggle('active');
};

setInterval(()=>{
    changeSlide();
}, 2000);

//player open


const musicPlayerSection = document.querySelector('.player');

musicPlayerSection.addEventListener('click', ()=>{
    musicPlayerSection.classList.add('active');
})




//Back to Home

const backHomeFromPlayer = document.querySelector('.player .arrow-btn');

backHomeFromPlayer.addEventListener('click', (e)=>{
    e.stopPropagation();
    musicPlayerSection.classList.remove('active');
});

//player to playlist

const trackListSection = document.querySelector('.track-list');
const menuBtn = document.querySelector('.player .menu-btn');

menuBtn.addEventListener('click', ()=>{
    trackListSection.classList.add('active')
})

//playlist to player

const backHomeTrackList = document.querySelector('.track-list .arrow-btn');

backHomeTrackList.addEventListener('click', ()=>{
        trackListSection.classList.remove('active');
    });

//music

let currentMusic = 0;

const music = document.querySelector('#audio-src');
const soundBar = document.querySelector('.sound-bar-range');
const currentMusicName = document.querySelector('.current-track-name');
const currentMusicArtist = document.querySelector('.current-track-artist');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');
const track = [...document.querySelectorAll('.track')];

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeRange = document.querySelector('.volume-range');

//play

playBtn.addEventListener('click', ()=>{
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
});

//pause

pauseBtn.addEventListener('click', ()=>{
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
});

//music play

const setMusic = (i) => {
    let musicListData = musicList[i];
    currentMusic = i;
    soundBar.value = 0;
    music.src = musicListData.path;
    currentMusicName.innerHTML = musicListData.name;
    currentMusicArtist.innerHTML = musicListData.artist;
    coverImage.src = musicListData.cover;

    setTimeout(() =>{
        soundBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
        currentMusicTime.innerHTML = "00 : 00";
        track.forEach((item) => item.classList.remove('active'));
        track[currentMusic].classList.add('active');
    }, 300);
};

setMusic(0);

//time

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min} : ${sec}`;
};

//music range



setInterval(() =>{
    // HTMLMediaElement.currentTime
    // value of input tag = currentTime of audio tag
    soundBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(soundBar.max)){
        if (repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        } else{
            forwardBtn.click();
        }
    }
    
}, 500);



soundBar.addEventListener('change', ()=>{
    music.currentTime = soundBar.value
})

//play next music
forwardBtn.addEventListener('click',  () => {
    if(currentMusic >=  musicList.length -1){
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click()
})

//play previous music
backwardBtn.addEventListener('click',  () => {
    if(currentMusic <= 0){
        currentMusic = musicList.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click()
})

//repeat

repeatBtn.addEventListener('click', ()=>{
    repeatBtn.classList.toggle('active');
});

//volume
volumeBtn.addEventListener('click', ()=>{
    volumeBtn.classList.toggle('active');
    volumeRange.classList.toggle('active');
});

volumeRange.addEventListener('input', ()=>{
    //HTMLMediaElement.volume (0 ~ 1)
    music.volume = volumeRange.value;
});

//playlist choice

track.forEach((item, i) => {
    item.addEventListener('click', ()=>{
        setMusic(i);
        playBtn.click();
    });
});