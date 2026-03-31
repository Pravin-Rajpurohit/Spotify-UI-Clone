console.log("JavaScript");
let currentSong =new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let anchor_tags = div.getElementsByTagName('a');

    //make array to store the songs...
    let songs = [];
    for (let i = 0; i < anchor_tags.length; i++) {
        const element = anchor_tags[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("songs%5C")[1])
        }
    }
    return songs

}

const playMusic = (track)=>{
    // let audio = new Audio("/songs/"+track)
    currentSong.src = "/songs/"+track
    currentSong.play()
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}



async function main() {

    
    //get list of all the songs
    let songs = await getSongs();

    //Show all the songs in the playlist...
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        
                            <img class="invert musicLogo"  src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Arjit Singh</div>
                            </div>

                            <div class="playnow">
                                <span>Play Now</span>
                                <svg class="invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                    height="24" color="#0c0c0c" fill="none" stroke="#0c0c0c" stroke-width="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path
                                        d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                        fill="currentColor" />
                                </svg>
                            </div>
                        
        
        
         </li>`;
    }

    //ATTACH an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{e.addEventListener("click", element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

    //Attach an event listner to play, next and previous

    play.addEventListener("click", ()=>{

        if(currentSong.paused){
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "/img/Play3.svg"
        }
        
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

} 

main();









