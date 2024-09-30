// codewithharsh_
let allmusic = [
    {
        name: "Pianai",
        artist: "Yunjing Zhang",
        img: "Images/image1", 
        src: "Musics/music1"   
    },
    {
        name: "Wumingderen",
        artist: "Buyi Mao",
        img: "Images/image2",
        src: "Musics/music2"
    },
    {
        name: "Tebiederen",
        artist: "Datong Fang",
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

//Queue Box Popup
queueBtn.addEventListener("click", ()=>{
    queueBox.style.bottom = "0px";
})

//Queue Box Close
queueClose.addEventListener("click", ()=>{
    queueBox.style.bottom = "-100%";
})

//Progress Bar Slider Runnable track
let updateSliderTrack = () =>{
    let min = progressBar.min;
    let max = progressBar.max;
    let value = progressBar.value;

    let bgSize = progressBar.style.cssText = 'background-size:' + (value - min) * 100 / (max - min) + "% 100%";
}

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //Calling loadMusic function on page load
})

//loadMusic function
let loadMusic =(indexNumb)=>{
    musicImg.src = `${allmusic[indexNumb - 1].img}.jpg`;
    musicTitle.innerHTML = `${allmusic[indexNumb - 1].name}`;
    musicArtist.innerHTML = `${allmusic[indexNumb - 1].artist}`;
    music.src = `${allmusic[indexNumb - 1].src}.mp3`;
    playingNow();
}

//Play Pause Button Event
playPauseBtn.addEventListener("click", ()=>{
    if(playPauseBtn.classList.contains("play")){ //If playPauseBtn contains class "play"
        playPauseBtn.classList.replace("play", "pause"); //then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
        music.play();
    }else{
        playPauseBtn.classList.replace("pause", "play"); //else replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "play_arrow";
        music.pause();
    }
    playingNow();
})

//Calculate current time
music.addEventListener("timeupdate", (e)=>{
    let currTime = e.target.currentTime; //Music current time
    let ttlTime = e.target.duration; //Music duration
    
    //Formatting current time in minute and second
    let currMin = Math.floor(currTime / 60);
    let currSec = Math.floor(currTime % 60);
    if(currSec < 10){
        currSec = `0${currSec}`; //adding 0(zero) if current second less than 10
    }
    currentTime.innerHTML = `${currMin}:${currSec}`;

    //Updating Progress bar on time update
    let progressWidth = (currTime / ttlTime) * 100; //Progress value
    if(isNaN(progressWidth)){ //If progressWidth is "NaN"
        progressWidth = 0;
    }
    progressBar.value = progressWidth; 
    updateSliderTrack();
})

//Updating music current time on slider seeking
progressBar.addEventListener("input", (e)=>{
    music.currentTime = e.target.value / 100 * music.duration;
})

music.addEventListener("loadeddata", ()=>{
    let duration = music.duration; //Music duration
    
    //Formatting music duration in minute and second
    let ttlMin = Math.floor(duration / 60);
    let ttlSec = Math.floor(duration % 60);
    if(ttlSec < 10){
        ttlSec = `0${ttlSec}`; //adding 0 if total second less than 10
    }
    totalTime.innerHTML = `${ttlMin}:${ttlSec}`;
})

//Next button event
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
})

//Previous Music Button event
prevBtn.addEventListener("click", ()=>{
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
})

//Changing Repeat/Repeat_one/Shuffle Button
repeatBtn.addEventListener("click", ()=>{
    //Getting innerText of icon and change accordingly
    let getText = repeatBtn.innerHTML; 
    switch(getText){
        case 'repeat': //If icon is "repeat" then change it to "repeat_one"
            repeatBtn.innerHTML = "repeat_one";
            break;
        case 'repeat_one': //If icon is "repeat_one" then change it to "shuffle"
            repeatBtn.innerHTML = "shuffle";
            break;
        case 'shuffle': //If icon is shuffle then change it to "repeat"
            repeatBtn.innerHTML = "repeat";
            break;
    }
})

//Now let's work on what to do after the song end according to the icon
music.addEventListener("ended", ()=>{
 //Now we'll do according to the icon (for example:- if user sets icon to shuffle then we'll play song randomly on song end)

    let getText = repeatBtn.innerHTML; //Getting innerText of icon
    switch(getText){
        //If user sets icon to repeat then play the next song and sets currentTime to 0(zero)
        case 'repeat': 
            music.currentTime = 0;
            nextBtn.click();
            break;
        //If user sets icon to repeat_one then repeat the song
        case 'repeat_one': 
            loadMusic(musicIndex);
            music.play();
            break;
        //If user sets icon to "shuffle" then shuffle the musicIndex in the range of music array length, pass randomIndex as musicindex and play the song
        case 'shuffle':
            let randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
            //After shuffling if randomIndex same as musicIndex then again shuffle the musicIndex
            do{
                randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
            }while(musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            music.play();
    }
})

//Showing all musics in music list
let showallMusic =()=>{
    //Creating music list accoding to the array length
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

        //Selecting audio tag of list which have audio source
        let audioTag = document.querySelector(`.music${i + 1}`);

        //Selecting span tag of list
        let audioDuration = document.querySelector(`#music${i + 1}`);

        //loading list music duration on page load
        audioTag.addEventListener("loadeddata", ()=>{
            let audioDura = audioTag.duration;
            
            //Formatting duration in minute and second
            let totalMin = Math.floor(audioDura / 60);
            let totalSec = Math.floor(audioDura % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`; //adding 0 if total second less than 10
            }
            audioDuration.innerHTML = `${totalMin}:${totalSec}`;
            audioDuration.setAttribute('total-duration', `${totalMin}:${totalSec}`);
        })
    }
}

//Play Particular Song On Click
let playingNow = ()=>{
    const allMusicTag = document.querySelectorAll(".music-list-music");
    for(let i = 0; i < allmusic.length; i++){
        let adDuraTxt = allMusicTag[i].querySelector(".mlm-music-time");

        //Removing class "playing" from all other list of music list except last clicked list
        if(allMusicTag[i].classList.contains("playing")){
            allMusicTag[i].classList.remove("playing");
            let adDuration = adDuraTxt.getAttribute("total-duration");
            adDuraTxt.innerHTML = adDuration;
        }
        //If there is any music in music list whic index is equal to musicIndex then add class "playing" in list
        if(allMusicTag[i].getAttribute('li-index') == musicIndex){
            allMusicTag[i].classList.add("playing");
            adDuraTxt.innerHTML = "Playing";
        }
        //adding on click attribute in all list of music list
        allMusicTag[i].setAttribute('onclick', 'clicked(this)');
    }
}

//Play song on click
let clicked =(element)=>{
    //Getting index of particular music clicked in the music list
    let getMusicIndex = element.getAttribute('li-index');
    musicIndex = getMusicIndex; //passing clicked music index to "musicIndex"
    loadMusic(musicIndex);
    music.play();
    playingNow();
    if(playPauseBtn.classList.contains("play")){ //If playPauseBtn contains class "play"
        playPauseBtn.classList.replace("play", "pause"); //then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
    }
    queueClose.click();
}

// 监听滑块的 input 事件，实时调整音量
volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
    updateVolumeIcon(); // 更新音量图标
    updateVolumeSliderBackground(); // 更新滑块背景
});

// 点击音量图标实现静音/取消静音
volumeIcon.addEventListener("click", () => {
    if (music.muted) {
        music.muted = false;
        volumeSlider.value = music.volume;
    } else {
        music.muted = true;
        volumeSlider.value = 0;
    }
    updateVolumeIcon(); // 更新音量图标
    updateVolumeSliderBackground(); // 更新滑块背景
});

// 更新音量图标的函数
function updateVolumeIcon() {
    if (music.muted || music.volume == 0) {
        volumeIcon.innerHTML = "volume_off";
    } else if (music.volume > 0 && music.volume <= 0.5) {
        volumeIcon.innerHTML = "volume_down";
    } else {
        volumeIcon.innerHTML = "volume_up";
    }
}

// 更新音量滑块背景的函数
function updateVolumeSliderBackground() {
    let value = volumeSlider.value * 100; // 将音量值转换为百分比
    volumeSlider.style.background = `linear-gradient(to right, #325114 0%, #325114 ${value}%, rgba(169, 166, 166, 0.6) ${value}%, rgba(169, 166, 166, 0.6) 100%)`;
}

// 在页面加载时初始化
window.addEventListener("load", () => {
    loadMusic(musicIndex); // 加载音乐
    music.volume = 0.5;
    volumeSlider.value = music.volume; // 设置初始音量
    updateVolumeIcon(); // 更新音量图标
    updateVolumeSliderBackground(); // 初始化滑块背景
});


showallMusic();
playingNow();
progressBar.addEventListener("input", updateSliderTrack);