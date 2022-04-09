const container = document.querySelector('.container');
musicImg = container.querySelector('.img-area img');
musicName = container.querySelector('.song-details .name');
musicTitle = container.querySelector('.song-details .title');
musicAudio = container.querySelector('#main-audio');
musicPlayPus = container.querySelector('.play-puse');
prevBtn = container.querySelector('#backward');
nextBtn = container.querySelector('#next');
progressArea = container.querySelector('.progress-area');
progressBar = container.querySelector('.progress-bar');
musicList = container.querySelector('.music-list');
showMoreBtm = container.querySelector('#musicBtn');
hideMoreBtm = musicList.querySelector('#close');
listSurah = musicList.querySelector('ul');

showMoreBtm.addEventListener('click',() =>{
    musicList.classList.toggle('show');
})
hideMoreBtm.addEventListener('click',() =>{
    showMoreBtm.click();
})
const sura = async () =>{
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await res.json();
    suraName(data);
};
sura();
let surahNum = 1;
if(localStorage.getItem('SurahNumber')){
    surahNum = localStorage.getItem('SurahNumber');
}
function suraName(data){
    data.data.forEach(element => {
        let surah = ` 
        <li>
        <div class="row">
            <span class = 'Surah'>${element.number}. ${element.englishName}</span>
            <p class='none'>${element.number}</p>
        </div>
    </li>
        `;
        listSurah.innerHTML += surah;
    }); 
}

listSurah.addEventListener('click',(e) =>{
    paused();
    if(e.target.classList == 'Surah'){
        surahNum = e.target.parentElement.children[1].innerText;
        showMoreBtm.click();
        SurahSearch(surahNum,'onn');
        progressBar.style.width = '0%';
    }
})
SurahSearch(surahNum,'off');

function SurahSearch(number,role){
    const searchName = async (id) =>{
        let url = `https://api.alquran.cloud/v1/surah/`;
        let urlSurah = url+id;
        const res = await fetch(urlSurah);
        const data = await res.json();
        let nub = '';
        if(data.data.number > 9){
            if(data.data.number > 100){
                nub = `${data.data.number}`;
            }else{
                nub = `0${data.data.number}`;
            }
        }else{
            nub = `00${data.data.number}`;
        }
    loadMusic(nub,data.data.englishName,role)
    localStorage.setItem('SurahNumber', id)
    }
    searchName(number);
}


function loadMusic(id,name,role){
    musicName.innerText = name;
    musicTitle.innerText = 'Ali Jaber';
    musicAudio.src = `https://server11.mp3quran.net/a_jbr/${id}.mp3`;
    if(role == 'onn'){
        PlayMusic();
    }
}
function PlayMusic(){
    container.classList.add('paused');
    musicPlayPus.querySelector('i').classList = 'fas fa-pause';
    musicAudio.play();
}
function paused(){
    container.classList.remove('paused');
    musicPlayPus.querySelector('i').classList = 'fas fa-play';
    musicAudio.pause();
}
function nextMusic(){
   if(surahNum == 114){
    surahNum = 1;
    SurahSearch(surahNum,'onn');
   }else{
    surahNum ++;
    SurahSearch(surahNum,'onn');
   }
}
function prevMusic(){
    if(surahNum == 1){
        surahNum = 114;
        SurahSearch(surahNum,'onn');
       }else{
        surahNum --;
        SurahSearch(surahNum,'onn');
       }
}
musicPlayPus.addEventListener('click',() =>{
    const isMusicPaused = container.classList.contains('paused');
    isMusicPaused ? paused() : PlayMusic();
})

nextBtn.addEventListener('click',() =>{
    nextMusic();
})
prevBtn.addEventListener('click',() =>{
    prevMusic();
})

musicAudio.addEventListener('timeupdate', (e) =>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = container.querySelector('.current');
     musicDurationTime = container.querySelector('.duration');
    musicAudio.addEventListener('loadeddata',() =>{
         let audioDuration = musicAudio.duration;
         let totalMin = Math.floor(audioDuration / 60);
         let totalSec = Math.floor(audioDuration % 60);
         if(totalSec < 10){
             totalSec = `0${totalSec}`;
         }
         if(totalMin < 10){
             totalMin = `0${totalMin}`;
         }
         musicDurationTime.innerHTML = `${totalMin}: ${totalSec}`;

        })
        let CurrentMin = Math.floor(currentTime / 60);
        let CurrentSec = Math.floor(currentTime % 60);
        if(CurrentSec < 10){
            CurrentSec = `0${CurrentSec}`;
        }
        if(CurrentMin < 10){
            CurrentMin = `0${CurrentMin}`;
        }
        musicCurrentTime .innerHTML = `${CurrentMin}: ${CurrentSec}`;
})
progressArea.addEventListener('click',(e) =>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = musicAudio.duration;
    musicAudio.currentTime = (clickedOffSetX / progressWidth) * songDuration;
    console.log(songDuration)
    PlayMusic()
})
const repeatBtm = container.querySelector('#repeat');

repeatBtm.addEventListener('click', () =>{
    let getText = repeatBtm.classList[1];
    switch(getText){
        case 'fa-redo':
            repeatBtm.classList = 'fas fa-sync';
        break;
        case 'fa-sync':
            repeatBtm.classList = 'fas fa-redo';
        break;
    }
})
musicAudio.addEventListener('ended',() =>{
    let getText = repeatBtm.classList[1];
    switch(getText){
        case 'fa-redo':
           nextMusic();
        break;
        case 'fa-sync':
            SurahSearch(surahNum,'onn');
        break;
    }
})