<?php
$mysql = mysqli_connect("localhost","root","","musicDB");
// cek apakah form sudah disubmit
if(isset($_POST["kirim"])){
    $cek_error_music = "";
    $cek_error_cover = "";
    $cek_error_name = "";
    $cek_error = "";

    // gunakan resource finfo untuk mengakses informasi mengenai file
    $file_music = $_FILES["music_file"];
    $cover_music = $_FILES["cover_image"];

    if($file_music["error"] !== 0 || $file_music["tmp_name"] == ""){
        $cek_error_music = "Mohon upload file musik Anda";
    }else if($file_music["error"] === 0){
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_file = finfo_file($finfo, $_FILES["music_file"]["tmp_name"]);
        finfo_close($finfo);
        if($mime_file !== "audio/mpeg"){
            $cek_error_music = "Mohon untuk upload file audio saja (.mp3)";
        }
        else if($file_music["size"] > 10485760){
            $cek_error_music = "Ukuran file musik tidak boleh lebih dari 10 MB";
        }
    }

    $array_mime_image = ["image/jpeg","image/png"];

    if($cover_music["error"] === 0){
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $cover_mime_type = finfo_file($finfo, $_FILES["cover_image"]["tmp_name"]);
        finfo_close($finfo);
        if(!in_array($cover_mime_type,$array_mime_image)){
            $cek_error_cover = "Mohon untuk upload file gambar (.jpg/.png)";
        }else if($cover_music["size"] > 1048576){
            $cek_error_cover = "Ukuran file cover tidak boleh lebih dari 1 MB";
        }
    }

    $name_artist = htmlentities(strip_tags(trim($_POST["artist_name"])));
    if(!empty($name_artist)){
        if(strlen($_POST["artist_name"]) > 20){
            $cek_error_name = "Maksimal 20 karakter";
        }
    }
    
    $error_length = strlen($cek_error_music . $cek_error_cover . $cek_error_name);
    if($error_length == 0){
        if(!is_dir("music")){
            mkdir("music");
            clearstatcache();
        }
      
        if(!is_dir("cover")){
            mkdir("cover");
            clearstatcache();
        }
            
        if(move_uploaded_file($file_music["tmp_name"],"music/{$file_music["name"]}")){
            $new_file = "";
            if(move_uploaded_file($cover_music["tmp_name"],"cover/{$cover_music["name"]}")){ 
                $new_name_file = pathinfo("music/{$file_music["name"]}")["filename"];
                $ext_file = pathinfo("cover/{$cover_music["name"]}")["extension"];
                $new_file = $new_name_file . "." . $ext_file;
                rename("cover/{$cover_music["name"]}","cover/$new_file");       
                }

                $path_music = "music/{$file_music["name"]}";

                $cover_path = "";
                if($new_file == ""){
                    $cover_path = "cover/cover_default.jpg";
                }else{
                    $cover_path = "cover/$new_file";
                }
                
                $display_name = pathinfo("music/{$file_music["name"]}")["filename"];
                
                if(empty($name_artist)){
                    $artist_name = "Unknown Artist";
                }else{
                    $artist_name = $name_artist;
                }
                

                $artist_name = mysqli_real_escape_string($mysql,$artist_name);
                $query = mysqli_query($mysql,"SELECT music_path FROM libraryMusic WHERE music_path='$path_music'");
                if(mysqli_num_rows($query) > 0){
                    $cek_error_music = "File musik dengan nama yang sama sudah ada, silakan ganti nama dari file tersebut";
                }else{
                    $query = mysqli_query($mysql,"INSERT INTO libraryMusic VALUES('$path_music','$cover_path','$display_name','$artist_name')");
                    header("Location: index.html");
                }
        }    
    }


}else{
    $cek_error_music = "";
    $cek_error_cover = "";
    $cek_error_name = "";
    $cek_error = "";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Add Music</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/c78150c242.js" crossorigin="anonymous"></script>
    <style>
        .container{
        width: 450px;
        margin: 10vh auto;
        background-color: #f2f2f2;
        border: 1px solid #a2a2a2;
        padding: 40px;
    }
    .error_message, .cek_error_music, .cek_error_cover, .cek_error_name{
        color: red;
    }
    .error_message{
        position: relative;
        top: 10px;
    }
    </style>
</head>
<body>
    <div class="container rounded">
    <h1 class="h1">Tambahkan musik</h1>
    <form action="formMusic.php" method="post" enctype="multipart/form-data">
            <div class="music_file">
                <label for="music_file" class="form-label mt-3 mb-2">Upload file musik Anda (file audio)</label>
                <input type="file" name="music_file" class="form-control" id="music_file" accept="audio/mpeg" >
            </div>
            <div class="cek_error_music" class="form-text"><?php  echo $cek_error_music ?></div>
            <div class="cover_image">
                <label for="cover_image" class="form-label mt-3 mb-2">Upload cover musik Anda (optional)</label>
                <input type="file" name="cover_image" class="form-control" id="cover_image" accept="image/jpeg, image/png">
            </div>
            <div class="cek_error_music" class="form-text"><?php  echo $cek_error_cover ?></div>
            
            <div class="artist_name">
                <label for="artist_name" class="form-label mt-3 mb-2">Nama pencipta lagu (optional)</label>
                <input type="text" name="artist_name" class="form-control" id="artist_name" >
            </div>
            <div class="cek_error_music" class="form-text"><?php  echo $cek_error_name ?></div>
            
            <button type="submit" name="kirim" class="btn btn-primary px-5 mx-auto mt-3">Kirim</button>
            <span class="error_message"><?php  echo $cek_error ?></span>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>