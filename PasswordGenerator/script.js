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
    let staticPassword = "";
    let randomPassword = "";
    let noDuplicate = false;
    let passwordLength = slider.value;

    options.forEach(option => {
        if(option.checked){
            if(option.id !== "no-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id];
            }else if(option.id === "spaces"){
                staticPassword += `  ${staticPassword}  `;
            }else{
                noDuplicate = true;
            }
        }
    });

    // generate character in password
    for(let i = 0; i < passwordLength; i++){
        let randomCharacters = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(noDuplicate){
            !randomPassword.includes(randomCharacters) || randomCharacters == " " ? randomPassword += randomCharacters : i--;
        }else{
            randomPassword += randomCharacters;
        }
    }
    password.value = randomPassword;
}

const UpdatePasswordIndicator = function(){
    passwordIndicator.id = slider.value <= 8 ? "weak" : slider.value <= 16 ? "medium" : "strong";
}

const updateSlider = function(){
    document.querySelector(".password-length span").innerText = slider.value;
    generatePassword();
    UpdatePasswordIndicator();
}
updateSlider();

const copyPassword = function(){
    navigator.clipboard.writeText(password.value);
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

