const APIKey = "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";
const tombolGenerator = document.getElementById("tombolGenerator");
const memuat = document.getElementById("memuatHasil");
const daftarGambar = document.getElementById("hasilGambar");

// angka bebas ini sebagai pembeda antar gambar yang dihasilkan
function dapatkanAngkaBebas(min,maks){
    return Math.floor(Math.random()*(maks - min + 1)) + min;
}

async function generateGambar(input){
    tombolGenerator.disabled = true;
    daftarGambar.innerHTML = "";
    memuat.style.display = "block";

    for(let i = 1; i <= 4; i++){ // 4 adalah jumlah gambar yang dihasilkan setiap prompt
        const angkaBebas = dapatkanAngkaBebas(1,10000);
        const userPrompt = `${input} ${angkaBebas}`; // data yang dikirim melalui request body

        const responsServer = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIKey}`,
                },
                body: `{ "inputs": "${userPrompt}"}`
                // harus gunakan key inputs
            }
        );

        if(!responsServer.ok){
            memuat.innerHTML = "Gagal untuk men-generate Gambar."
        }
        // mendapatkan data gambar menggunakan blob()
        const dataGambar = await responsServer.blob();
        console.log(dataGambar);
        const urlGambar = URL.createObjectURL(dataGambar);
        console.log(urlGambar);

        const gambar = document.createElement("img");
        gambar.src = urlGambar;
        gambar.alt = `art-${i}`;
        gambar.onclick = function(){unduhGambar(urlGambar, i);}
        document.getElementById("hasilGambar").appendChild(gambar);
    }

        memuat.style.display = "none";
        tombolGenerator.disabled = false;
}

document.getElementById("tombolGenerator").addEventListener("click",function(){
    const input = document.getElementById("prompt").value;
    if(input === ""){
        return;
    }
    generateGambar(input);
});

function unduhGambar(urlGambar, nomorGambar){
    const tautan = document.createElement("a");
    tautan.href = urlGambar;
    tautan.download = `image-${nomorGambar}.jpg`;
    tautan.click();
}