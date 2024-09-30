// Array of music objects with details for each track
let allmusic = [
    {
        name: "Sticky",
        artist: "KISS Of LIFE",
        img: "Images/image1", 
        src: "Musics/music1"   
    },
    {
        name: "Lion Heart",
        artist: "Girls' Generation",
        img: "Images/image2",
        src: "Musics/music2"
    },
    {
        name: "Love Lee",
        artist: "AKMU",
        img: "Images/image3",
        src: "Musics/music3"
    },  
];

let progressBar = document.querySelector(".container .progress-area .progress-bar");
let queueBox = document.querySelector(".container .queue-box");
let queueClose = document.querySelector(".container .queue-close");
let queueBtn = document.querySelector(".container .queue");
let musicImg = document.querySelector(".container .img img");
let musicTitle = document.querySelector(".container .title-artist .title");
let musicArtist = document.querySelector(".container .title-artist .artist");
let music = document.querySelector("#music");
let playPauseBtn = document.querySelector(".container .play-pause");
let currentTime = document.querySelector(".container .current-time");
let totalTime = document.querySelector(".container .total-time");
let nextBtn = document.querySelector(".container .next-btn");
let prevBtn = document.querySelector(".container .back-btn");
let repeatBtn = document.querySelector(".container .loop-btn");
let allMusicsBox = document.querySelector(".container .music-list");
let volumeSlider = document.querySelector(".container .volume-slider");
let volumeIcon = document.querySelector(".container .volume-icon");

let musicIndex = 1;

//Show the queue box
queueBtn.addEventListener("click", ()=>{
    queueBox.style.bottom = "0px";
});

//Hide the queue box
queueClose.addEventListener("click", ()=>{
    queueBox.style.bottom = "-100%";
});

//Update the progress bar track
const updateSliderTrack = () =>{
    let min = progressBar.min;
    let max = progressBar.max;
    let value = progressBar.value;
    progressBar.style.backgroundSize = ((value - min) * 100) / (max - min) + "% 100%";
};

// Load the music when the page loads
window.addEventListener("load", ()=>{
    loadMusic(musicIndex); 
    music.volume = 0.5;
    volumeSlider.value = music.volume;
    updateVolumeIcon();
    updateVolumeSliderBackground();
});

//Load music function
const loadMusic =(indexNumb) => {
    let track = allmusic[indexNumb - 1];
    musicImg.src = `${track.img}.jpg`;
    musicTitle.textContent = track.name;
    musicArtist.textContent = track.artist;
    music.src = `${track.src}.mp3`;
    playingNow();
};

//Play Pause button event
playPauseBtn.addEventListener("click", ()=>{
    if(playPauseBtn.classList.contains("play")){ 
        playPauseBtn.classList.replace("play", "pause"); 
        playPauseBtn.querySelector("i").textContent = "pause";
        music.play();
    } else {
        playPauseBtn.classList.replace("pause", "play"); 
        playPauseBtn.querySelector("i").textContent = "play_arrow";
        music.pause();
    }
    playingNow();
});

// Update current time and progress bar
music.addEventListener("timeupdate", (e) => {
    let currTime = e.target.currentTime; 
    let ttlTime = e.target.duration; 

    //Update current time display
    let currMin = Math.floor(currTime / 60);
    let currSec = Math.floor(currTime % 60);
    if(currSec < 10) currSec = `0${currSec}`; 
    currentTime.textContent = `${currMin}:${currSec}`;

    //Update progress bar
    let progressWidth = (currTime / ttlTime) * 100; 
    if(isNaN(progressWidth)) progressWidth = 0;
    progressBar.value = progressWidth; 
    updateSliderTrack();
});

// Seek music position when progress bar changes 
progressBar.addEventListener("input", (e) => {
    music.currentTime = e.target.value / 100 * music.duration;
});

// Update total duration when metadata is loaded
music.addEventListener("loadeddata", () => {
    let duration = music.duration; 
    let ttlMin = Math.floor(duration / 60);
    let ttlSec = Math.floor(duration % 60);
    if(ttlSec < 10) ttlSec = `0${ttlSec}`; 
    totalTime.textContent = `${ttlMin}:${ttlSec}`;
})

// Next button event
nextBtn.addEventListener("click", ()=>{
    musicIndex++; //Increment of index by 1
    //If musicIndex greater than array length then music index = 1 else musicIndex = musicIndex
    musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    if(playPauseBtn.classList.contains("play")){ //If playPauseBtn contains class "play"
        playPauseBtn.classList.replace("play", "pause"); //then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
    }
    setTimeout(()=>{
        music.play();
    }, 700);
    playingNow();
});

// Previous Button event
prevBtn.addEventListener("click", ( )=> {
    musicIndex--; //Decrement of index by 1
    //If musicIndex less than 1 then musicIndex will be equal to array length
    musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    if(playPauseBtn.classList.contains("play")){ //If playPauseBtn contains class "play"
        playPauseBtn.classList.replace("play", "pause"); //then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
    }
    setTimeout(()=>{
        music.play();
    }, 700);
    playingNow();
});

// Change Repeat/Repeat_one/Shuffle Button
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerHTML; 
    switch(getText){
        case 'repeat':
            repeatBtn.innerHTML = "repeat_one";
            break;
        case 'repeat_one': 
            repeatBtn.innerHTML = "shuffle";
            break;
        case 'shuffle': 
            repeatBtn.innerHTML = "repeat";
            break;
    }
});

// Handle music and event
music.addEventListener("ended", () => {
    let getText = repeatBtn.innerHTML; 
    switch(getText){
        case 'repeat': 
            music.currentTime = 0;
            nextBtn.click();
            break;
        case 'repeat_one': 
            loadMusic(musicIndex);
            music.play();
            break;
        case 'shuffle':
            let randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
            do{
                randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
            }while(musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            music.play();
    }
});

// Display all musics in music list
const showallMusic = () => {
    for(let i = 0; i < allmusic.length; i++){
        let list = `
            <div class="music-list-music" li-index="${i + 1}">
                <div class="mlm-img">
                    <img src="${allmusic[i].img}.jpg" alt="">
                </div>
                <p class="mlm-music-title">${allmusic[i].name}</p>
                <p class="mlm-music-artist">${allmusic[i].artist}</p>
                <audio class="music${i + 1}" src="${allmusic[i].src}.mp3"></audio>
                <span class="mlm-music-time" id="music${i + 1}">3:45</span>
            </div>`;
        allMusicsBox.insertAdjacentHTML('beforeend', list);

        // Load and display duration
        let audioTag = document.querySelector(`.music${i + 1}`);
        let audioDuration = document.querySelector(`#music${i + 1}`);

        audioTag.addEventListener("loadeddata", () => {
            let audioDura = audioTag.duration;
            let totalMin = Math.floor(audioDura / 60);
            let totalSec = Math.floor(audioDura % 60);
            if(totalSec < 10) totalSec = `0${totalSec}`; 
            audioDuration.textContent = `${totalMin}:${totalSec}`;
            audioDuration.setAttribute('total-duration', `${totalMin}:${totalSec}`);
        })
    }
};

// Update playing status in the music list
const playingNow = () => {
    const allMusicTag = document.querySelectorAll(".music-list-music");
    for(let i = 0; i < allmusic.length; i++){
        let adDuraTxt = allMusicTag[i].querySelector(".mlm-music-time");

        if(allMusicTag[i].classList.contains("playing")){
            allMusicTag[i].classList.remove("playing");
            let adDuration = adDuraTxt.getAttribute("total-duration");
            adDuraTxt.innerHTML = adDuration;
        }
        if(allMusicTag[i].getAttribute('li-index') == musicIndex){
            allMusicTag[i].classList.add("playing");
            adDuraTxt.innerHTML = "Playing";
        }
        allMusicTag[i].setAttribute('onclick', 'clicked(this)');
    }
};

//Play song on click
let clicked =(element) => {
    let getMusicIndex = element.getAttribute('li-index');
    musicIndex = getMusicIndex; 
    loadMusic(musicIndex);
    music.play();
    playingNow();
    if(playPauseBtn.classList.contains("play")){ 
        playPauseBtn.classList.replace("play", "pause"); 
        playPauseBtn.querySelector("i").innerHTML = "pause";
    }
    queueClose.click();
};

// Volume slider event
volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
    updateVolumeIcon(); 
    updateVolumeSliderBackground();
});

// Mute/Unmute on volume icon click
volumeIcon.addEventListener("click", () => {
    if (music.muted) {
        music.muted = false;
        volumeSlider.value = music.volume;
    } else {
        music.muted = true;
        volumeSlider.value = 0;
    }
    updateVolumeIcon(); 
    updateVolumeSliderBackground(); 
});

// Update volume icon based on volume level
function updateVolumeIcon() {
    if (music.muted || music.volume == 0) {
        volumeIcon.innerHTML = "volume_off";
    } else if (music.volume > 0 && music.volume <= 0.5) {
        volumeIcon.innerHTML = "volume_down";
    } else {
        volumeIcon.innerHTML = "volume_up";
    }
}

// Update volume slider background
function updateVolumeSliderBackground() {
    let value = volumeSlider.value * 100; 
    volumeSlider.style.background = `linear-gradient(to right, #325114 0%, #325114 ${value}%, rgba(169, 166, 166, 0.6) ${value}%, rgba(169, 166, 166, 0.6) 100%)`;
}

// Initialize the music list and playing status
window.addEventListener("load", () => {
    loadMusic(musicIndex); 
    music.volume = 0.5;
    volumeSlider.value = music.volume; 
    updateVolumeIcon(); 
    updateVolumeSliderBackground(); 
});


showallMusic();
playingNow();
progressBar.addEventListener("input", updateSliderTrack);