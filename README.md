# waa barnamij laga dhageysan karo quraan kariim sheek cali cabdullahi jaber
![Design preview for the Interactive rating component coding challenge](./desktop%20design.JPG)

waxaa ku bartey sida loo dhiso barnaamijydda codadka laga dhageeysto waxaan ku dhisey 

- html / css
- javascript

waxaan si fecan ugu bartey javascriptoo intuu marayo loo soo saaro codka ku bartey waakan 

```

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
```
list surah wxaa ka keney api
 ```
https://api.alquran.cloud/v1/surah
 ```
codknna waxaa ksoo qaadtey suuradaha compnayga mp3quran.net oo aad ka heleysid 220 qaari oo akhrinyya quraanka ani ling istcmaaly waa kan
 ```
 https://server11.mp3quran.net/a_jbr/
 ```
