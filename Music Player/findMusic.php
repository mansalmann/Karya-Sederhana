<?php
// dapatkan data musik ketika music app player di akses
$mysql = mysqli_connect("localhost","root","","musicDB");
if(isset($_GET["find"])){
    $findMusic = htmlentities(strip_tags(trim($_GET["find"])));
    if($findMusic === "true"){
        $query = mysqli_query($mysql,"SELECT * FROM libraryMusic ORDER BY music_path ASC");
        $music_array = [];
        if(mysqli_num_rows($query) > 0){
            while($results = mysqli_fetch_assoc($query)){
                $data = new stdClass();
                $data->{"artist"} = $results["artist_name"];
                $data->{"cover"} = $results["cover_path"];
                $data->{"displayName"} = $results["display_name"];
                $data->{"path"} = $results["music_path"];
                
                $music_array[] = $data;
            }
        }
        // kirim data lagu dalam bentuk array of objects
        echo json_encode($music_array);
    }else{
        header("Location: formMusic.php");
    }
}else{
    header("Location: formMusic.php");
}

?>