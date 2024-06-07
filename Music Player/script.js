const image = document.getElementById("cover");
const artist = document.getElementById("music-artist");
const title = document.getElementById("music-title");
const currentTimeMusic = document.getElementById("current-time");
const durationTimeMusic = document.getElementById("duration-time");
const progress = document.getElementById("progress");
const circleBar = document.getElementById("circle");
const playerProgress = document.getElementById("player-progress");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("forward");
const playButton = document.getElementById("play");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");

// mengggunakan audio object (HTMLAudioElement)
const music = new Audio();
image.src = "cover/cover_default.jpg";

async function fetchDataMusic(){
    try{
        let response = await fetch("findMusic.php?find=true");
        if(!response.ok && response.status !== 200){
            throw new Error("Terjadi error, gagal mengambil data musik dari database");
        }
        let songs = await response.json();
        let musicIndex = 0; // menentukan urutan lagu yang ingin diputar
        let isPlaying = false; // kondisi music player

        repeatButton.addEventListener("click",function(){
            repeatButton.classList.toggle("repeat-active");
            if(repeatButton.classList.contains("repeat-active")){
                shuffleButton.classList.remove("shuffle-active");
                }
        })
        
        shuffleButton.addEventListener("click",function(){
            shuffleButton.classList.toggle("shuffle-active");
            if(shuffleButton.classList.contains("shuffle-active")){
                repeatButton.classList.remove("repeat-active");
                }
        })

        // fungsi untuk menjalankan music 
        function togglePlay(){
            if(isPlaying){
                pauseMusic();
            }else{
                playMusic();
            }
        }

        function playMusic(){
            isPlaying = true;
            playButton.classList.replace("fa-play","fa-pause");
            playButton.setAttribute("title","Pause");
            music.play();
        }

        function pauseMusic(){
            isPlaying = false;
            playButton.classList.replace("fa-pause","fa-play");
            playButton.setAttribute("title","Play");
            music.pause();
        }

        // fungsi untuk load music diisi argumen object pada array music
        function loadMusic(song){
            music.src = song.path; // mendapatkan path dari file music yang ingin diputar
            if(song.displayName.length > 20){
                let titleSong = song.displayName.substring(0,19) + "...";
                title.textContent = titleSong;
            }else{
                title.textContent = song.displayName;
            }
            title.title = song.displayName;
            if(song.artist.length > 18){
                let artistName = song.artist.substring(0,17) + "...";
                artist.title = artistName;
            }else{
                artist.textContent = song.artist;
            }
            artist.title = song.artist;
            image.src = song.cover;
        }

        // fungsi untuk mengubah lagu
        // function changeMusic(value){
        //     musicIndex = (musicIndex + value + songs.length) % songs.length;
        //     loadMusic(songs[musicIndex]);
        //     playMusic();
        // }

        function nextMusic(){  
            if(shuffleButton.classList.contains("shuffle-active")){
                music.loop = false;    
                repeatButton.classList.remove("repeat-active");
                let musicIndexAfter = 0;

                while(musicIndexAfter = Math.floor(Math.random() * songs.length) + ""){
                    if((musicIndexAfter != musicIndex)){
                        break;
                    }
                }             
                musicIndex = musicIndexAfter;
                loadMusic(songs[musicIndexAfter]);
            }else{
                if(repeatButton.classList.contains("repeat-active")){
                    music.loop = true;
                    shuffleButton.classList.remove("shuffle-active");
                }   
                else if(musicIndex == songs.length - 1){  
                    musicIndex = 0;
                }else{
                    musicIndex = musicIndex + 1;
                }
                loadMusic(songs[musicIndex]);
            }
            playMusic();
        }

        function prevMusic(){
            if(shuffleButton.classList.contains("shuffle-active")){
                music.loop = false;    
                repeatButton.classList.remove("repeat-active");
                let musicIndexAfter = 0;

                while(musicIndexAfter = Math.floor(Math.random() * songs.length) + ""){
                    if((musicIndexAfter != musicIndex)){
                        break;
                    }
                }             
                musicIndex = musicIndexAfter;
                loadMusic(songs[musicIndexAfter]);
            }else{
                if(repeatButton.classList.contains("repeat-active")){
                    music.loop = true;
                }else if(musicIndex == 0){  
                    musicIndex = songs.length - 1;
                }else{
                    musicIndex = musicIndex - 1;
                }
                loadMusic(songs[musicIndex]);
            }
            playMusic();
        }

        // fungsi ini sebagai update progress bar music yang sedang berjalan dan akan selalu dijalankan selama music berjalan
        function updateProgressBarMusic(){
            // dapatkan data durasi dan waktu musik yang sedang berjalan dari audio object
            const {duration,currentTime} = music;
            // dapatkan nilai persent waktu musik berjalan
            const progressMusicPercent  = (currentTime/duration)*100;
            
            // ubah lebar dari element progress bar dan circlebar
            progress.style.width = `${progressMusicPercent}%`;
            circleBar.style.left = `${progressMusicPercent-2}%`;

            // memformat waktu musik
            const formatMusicTime = function(time){
                return String(Math.floor(time)).padStart(2,'0');
            }

            // menampilkan waktu berjalan dan durasi dari musik yang sedang dimainkan
            currentTimeMusic.textContent = `${formatMusicTime(currentTime / 60)}:${formatMusicTime(currentTime % 60)}`;
            durationTimeMusic.textContent = `${formatMusicTime(duration / 60)}:${formatMusicTime(duration % 60)}`;
        }

        // fungsi ini untuk menentukan lebar dari progress bar
        function setProgressBar(position){  
            const width = playerProgress.clientWidth;
            const positionCursorX = position.offsetX;
            music.currentTime = (positionCursorX/width) * music.duration;
        }

        // event handler
        playButton.addEventListener("click",togglePlay);
        prevButton.addEventListener("click",function(){prevMusic()});
        nextButton.addEventListener("click",function(){nextMusic()});
        music.addEventListener("ended",function(){nextMusic()});
        music.addEventListener("timeupdate",updateProgressBarMusic);
        playerProgress.addEventListener("click",setProgressBar);
        progress.addEventListener("drag",setProgressBar);
        window.addEventListener("keydown",function(e){
            if(e.key === " "){
                togglePlay()
            }
        })
        loadMusic(songs[musicIndex]);
    }catch(error){  
        console.log(error);
    }
}

fetchDataMusic();