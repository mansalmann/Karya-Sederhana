// mengatur map
function mulai(){
    let konfigurasiAwal = {
        zoom: 10,
        // lokasi awal maps
        center: new google.maps.LatLng(-7.7835775,110.3883855),
        // tipe dari map (Roadmap, satellite, hybird, terrain)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 2      
       };

       // membuat sebuah maps
       let peta = new google.maps.Map(document.getElementById("peta"), konfigurasiAwal);

       // informasi lokasi
       let informasi = new google.maps.InfoWindow();

       // penanda lokasi
        let penanda = new google.maps.Marker({
            position: new google.maps.LatLng(-7.7835775,110.3883855),
            map: peta,
            title: 'Sleman, Jogja'
        });
        
        penanda.addListener("click", function(){
            informasi.setContent(penanda.title);
            informasi.open(peta, penanda);
        });

        // membuat maps selalu ke tengah ketika mengalami perubahan ukuran maps
        google.maps.event.addDomListener(window, "resize", function(){
            peta.setCenter(konfigurasiAwal.center);
        });
       
}

// inisialisasi maps ketika halaman web selesai diproses
google.maps.event.addDomListener(window, "load", mulai)

