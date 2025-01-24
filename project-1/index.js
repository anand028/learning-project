let inc = document.querySelector(".increment");
let dec = document.querySelector(".decrement");
let countValue = document.querySelector(".val")

inc.addEventListener("click" , ()=>{
 
let value = parseInt(countValue.innerText)
value = value + 1;
countValue.innerText = value

})


dec.addEventListener("click" , ()=>{
    let value = parseInt(countValue.innerText)
    value--
    countValue.innerText = value;
})

// function increment(){
//       let inc = document.querySelector(".increment")
//          inc.innerText = parseInt(value);
//          value = value + 1 ;
//          inc.innerText = "value"
// }