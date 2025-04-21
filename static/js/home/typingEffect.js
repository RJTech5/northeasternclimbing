// Final text to display.
let finalText = "Northeastern Recreational Climbing Club";
// Time delay between each character in milliseconds.
let timeDelay = 50;

let textBox = document.getElementById("titleText");
textBox.innerHTML = "";

for (let index = 0; index < finalText.length; index++) {
    setTimeout(() => {addLetter(finalText[index]);}, timeDelay * index);
}

// Adds character to text box inner html.
function addLetter(letter) {
    textBox.innerHTML += letter;
}

