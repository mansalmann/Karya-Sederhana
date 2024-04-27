const slider = document.querySelector(".password-length input");
const options = document.querySelectorAll(".option input");
const copyText = document.querySelector(".input-password span");
const password = document.querySelector(".input-password input");
const passwordIndicator = document.querySelector(".password-indicator");
const button = document.querySelector(".generate_password");

// database karakter yang digunakan untuk men-generate password
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
    numbers: "0123456789",
    symbols: "!@#$%^&*()[]{}<>~;:.,+-"
}

const generatePassword = function(){
    let staticPassword = ""; // menyiapkan daftar karakter yang dapat digunakan
    let randomPassword = "";
    let noDuplicate = false; 
    let passwordLength = slider.value;

    options.forEach(option => {
        if(option.checked){
            if(option.id !== "no-duplicate"){
                staticPassword += characters[option.id];
            }else{ 
                noDuplicate = true;
            }
        }
    });

    // men-generate password berdasarkan nilai pada static password
    for(let i = 0; i < passwordLength; i++){
        let randomCharacters = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        
        // cek jika ada karakter yang sama
        if(noDuplicate){
            if(!randomPassword.includes(randomCharacters)){
                randomPassword += randomCharacters;
            }else{
                i--;
            }
        }else{
            randomPassword += randomCharacters;
        }
    }
    password.value = randomPassword;
}

const UpdatePasswordIndicator = function(){
    if(slider.value <= 6){
        passwordIndicator.id = "weak";
    }else if(slider.value <= 14){
        passwordIndicator.id = "medium";
    }
    else if((options[1].checked || options[2].checked || options[3].checked) && (slider.value > 14)){
        passwordIndicator.id = "strong";
    }
}

// jika nilai slider berubah, maka akan secara otomatis men-generate password baru
const updateSlider = function(){
    document.querySelector(".details span").innerText = slider.value;
    generatePassword();
    UpdatePasswordIndicator();
}
updateSlider();

// untuk men-copy password yang sudah digenerate
const copyPassword = function(){
    window.navigator.clipboard.writeText(password.value);
    copyText.innerText = "check";
    copyText.style.color = "#4285f4";
    setTimeout(()=>{
        copyText.innerText = "copy_all";
        copyText.style.color = "#707070";
    },1500)
}

copyText.addEventListener("click", copyPassword);
slider.addEventListener("input", updateSlider);
button.addEventListener("click",generatePassword)

