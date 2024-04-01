const riwayatChat = document.getElementById("riwayatChat"),
userPrompt = document.getElementById("userPrompt"),
tombolKirim = document.getElementById("tombolKirim"),
logoKirim = document.getElementById("logoKirim"),
informasi = document.querySelector(".informasi");

tombolKirim.addEventListener("click",kirimPesan);
userPrompt.addEventListener("keydown", function(dataEvent){
    if(dataEvent.key === "Enter"){
        kirimPesan();
    }
});

function kirimPesan(){
     const pesan = userPrompt.value.trim();
     if(pesan === ""){
        return;
     }else if(pesan === "creator"){
        userPrompt.value = "";
        tambahkanPesan("user",pesan);
        setTimeout(function(){
            tambahkanPesan("system", "Dibuat oleh Salman Alfarisi.");
            logoKirim.classList.add("fa-solid","fa-paper-plane");
            logoKirim.classList.remove("fas","fa-spinner","fa-pulse");
        },2000);
        return;
     }
     tambahkanPesan("user",pesan);
     userPrompt.value = "";

     const options = {
        method: 'POST',
	    headers: {
			'content-type': 'application/json',
            'X-RapidAPI-Key': '10e42692eemshbea4a5f72d8f4f9p184365jsndd748de90554',
            'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
            },
        body: `[{
            "content": "${pesan}",
            "role": "user"
        }]`
    
}
    fetch('https://chatgpt-api8.p.rapidapi.com/',options).then((response) => response.json()).then((response) => {
        tambahkanPesan("system",response.message);
        logoKirim.classList.add("fa-solid","fa-paper-plane");
        logoKirim.classList.remove("fas","fa-spinner","fa-pulse");
    }).catch(error =>{
        if(error.name === "TypeError"){
            tambahkanPesan("system","Error : Cek APIKey-mu");
            logoKirim.classList.add("fa-solid","fa-paper-plane");
            logoKirim.classList.remove("fas","fa-spinner","fa-pulse");
        }
    });     
}

function tambahkanPesan(pengirim,pesan){
    informasi.style.display = "none";
    logoKirim.classList.remove("fa-solid","fa-paper-plane");
    logoKirim.classList.add("fas","fa-spinner","fa-pulse");

    const elemenObrolan = document.createElement("div");
    const elemenPesan = document.createElement("div");
    const elemenIcon = document.createElement("div");
    const icon = document.createElement("i");

    elemenObrolan.classList.add("kotakobrolan");
    elemenPesan.classList.add(pengirim);
    elemenPesan.innerText = pesan;

    if(pengirim === "user"){
        icon.classList.add("fa-regular", "fa-user");
        elemenIcon.setAttribute("id","user-icon");
        elemenObrolan.appendChild(elemenPesan);
        elemenIcon.appendChild(icon);
        elemenObrolan.appendChild(elemenIcon);
    }else{
        icon.classList.add("fa-solid", "fa-robot");
        elemenIcon.setAttribute("id","bot-icon");
        elemenIcon.appendChild(icon);
        elemenObrolan.appendChild(elemenIcon);
        elemenObrolan.appendChild(elemenPesan);
    }

    
    riwayatChat.append(elemenObrolan);
    riwayatChat.scrollTo = riwayatChat.scrollHeight;
}




