const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector('.copy-btn');
const dataCopying = document.querySelector("[data-copying]");
const passwordLengthIs = document.querySelector("[data-passwordLength]");
const lengthSlider = document.querySelector("[data-lenghtSlider]")
const upperCase = document.querySelector("#d-1");
const lowerCase = document.querySelector("#d-2");
const num = document.querySelector("#d-3");
const sym = document.querySelector("#d-4");
const colorIndicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".Generator-btn");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
const symbol = "`~!@#$%^&*()-_=+][{};':,"

let password = ""
let passwordLength = 10 ;
let checkboxCount = 0;
handleSlider();
// set indicator color grey

function handleSlider(){
    lengthSlider.value = passwordLength ;
    passwordLengthIs.innerText = passwordLength ; 
}

function setIndicator(){
    colorIndicator.style.backgroundColor = color ;
    //shadow
}

function getRandomInteger(min , max){
 return Math.floor(Math.random()*(max-min)+min); 
}

function generateRandomNumber(){
    return getRandomInteger(1 , 9);
}

function generateLowerCase(){
   return  String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return  String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
const randNum = getRandomInteger(symbol.length);
return symbol.charAt(randNum);
 }   

function calcStrength(){
//add according to you
} 

 async function copyContent(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    dataCopying.innerText = "text copied" 
}
catch(e){
    dataCopying.innerText = "failed"
}
//to make copy wala span invisible
dataCopying.classList.add("active");

setTimeout(()=>{
    dataCopying.classList.remove("active");
} , 2000);

}

function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1 ; i>0 ; i--) {
        const j = Math.floor(Math.random()* (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp ;
    }
    let str = "" ;
    array.forEach((el) => (str += el));
    return str;


}


function handleCheckBoxChange(){
    checkboxCount = 0;
    checkBoxes.forEach((checkBoxes)=>{
        if(checkBoxes.checked)
            checkboxCount++;
    });
    //special condition

    if(passwordLength < checkboxCount){
        passwordLength = checkboxCount;
        handleSlider();
    }
}

checkBoxes.forEach((checkBoxes)=>{
    checkBoxes.addEventListener('change',handleCheckBoxChange);

});




lengthSlider.addEventListener("input" , (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , ()=>{
   if(passwordDisplay.value){
    copyContent();
   } 
})


generateBtn.addEventListener('click' , ()=>{
// none of the checkboxes are selected
if(checkboxCount <= 0) return ;

if(passwordLength < checkboxCount){
    passwordLength = checkboxCount;
    handleSlider();

}



// let's start to find new password

//remove old pass
password= "";

//let mentioned the stuff by checkboxes
// if(upperCase.checked){
//     password += generateUpperCase();
// }

// if(lowerCaseCase.checked){
//     password += generateLowerCase();
// }

// if(num.checked){
//     password += generateRandomNumber();
// }

// if(sym.checked){
//     password += generateSymbol();
// }

let funcArr = [];

if (upperCase.checked)
       funcArr.push(generateUpperCase);

if (lowerCase.checked)
    funcArr.push(generateLowerCase);

if (num.checked)
    funcArr.push(generateRandomNumber);

if (sym.checked)
    funcArr.push(generateSymbol);


 //compulsory addition

 for(let i = 0  ; i<funcArr.length ; i++){
   password +=funcArr[i](); 
 }

 //remaining

 for(let i = 0  ; i<passwordLength-funcArr.length ; i++){
//     password +=funcArr[i](); 
 let randIndex = getRandomInteger(0 , funcArr.length);
 password += funcArr[randIndex]();
   }

   // shuffle password

   password = shufflePassword(Array.from(password));

   //show in ui
   passwordDisplay.value = password;
   //calculate strength
   calcStrength();



})
