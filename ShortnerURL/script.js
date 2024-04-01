const tombolPersingkat = document.getElementById('singkat');
const tombolMuatUlang = document.getElementById('muatulang');
const urlBaru = document.getElementById('url');
let URLasli = document.getElementById("URLasli");

tombolPersingkat.addEventListener('click', function(){
    
    // let apiurl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(URLasli);
//     fetch(apiurl)
//     .then((response) => response.text())
//     .then((data) => urlBaru.value = data)
//     .catch((error) => urlBaru.value = "Terjadi error. Mohon coba lagi.")
// })

function requestData(){
    const request = new Request("https://tinyurl.com/api-create.php?url=" + encodeURIComponent(URLasli.value));

    
    const response = fetch(request);
    response
    .then(response => response.text()) // promise
    .then(data => urlBaru.value = data)
    .catch( () => urlBaru.value = "Terjadi error. Mohon coba lagi.")}

requestData();
})

tombolMuatUlang.addEventListener('click', function(){
    window.location.reload()
}) 

