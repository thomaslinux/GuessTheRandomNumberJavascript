let MIN = 0;
let MAX = 1000;
let nbToFind = 0;
let nbVerif = 0;
let wins = 0;
let boolWin = false;
const output = document.getElementById("output");
const input = document.getElementById("input");
const infoNbVerif = document.getElementById("nbVerif");
const htmlMIN = document.getElementById("min");
const htmlMAX = document.getElementById("max");
const reload = document.getElementById("reload");
document.querySelector("#version").innerText += "\nJS_2025-12-17_10:44"
reload.addEventListener('click', (e) => { init(); });
// window.onload = init;
init();

function init() {
    wins = parseInt(localStorage.getItem("wins")) || 0;
    boolWin = false;
    htmlMIN.innerText = MIN;
    htmlMAX.innerText = MAX;
    nbToFind = alea(MIN, MAX);
    nbVerif = -1;
    verif();
    input.value = MAX;
    verifNb();
    infoNbVerif.innerText = "0";
    document.querySelector("#wins span").innerText = wins;
}

input.addEventListener("input", verif)
input.addEventListener("wheel", onWheel)
function onWheel(e) {
    e.preventDefault();
    if (e.deltaY > 0) { // on scroll down
        operation('-', MAX / 20);
    } else if (e.deltaY < 0) { // on scroll up
        operation('+', MAX / 20);
    }
}

// https://stackoverflow.com/questions/5961333/prevent-default-action-for-tab-key-in-chrome#:~:text=need%20to%20call%20the%20event%20on%20keydown
// Already on keydown so why ??
document.addEventListener('keydown', function (e) {  verifKey(e); });
// input.keydown(function (e) {  verifKey(e); }) // jQuery only also input already exists ??
input.addEventListener('keydown', function (e) {  verifKey(e); });
function verifKey(e) {
    if (e.key === 'Enter' || e.key === 'Tab' || event.keyCode === 9) { e.preventDefault(); verifNb(); }
    if (e.key === 'n' || e.key === 'c' || e.key === '.') { e.preventDefault(); init(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); operation('+', MAX / 20); }
    //if (e.key === 'ArrowRight') {e.preventDefault(); operation('+', MAX / 20);}
    if (e.key === 'ArrowDown') { e.preventDefault(); operation('-', MAX / 20); }
    //if (e.key === 'ArrowLeft') {e.preventDefault(); operation('-', MAX / 20);}
    if (e.key === '-' || e.key === 'q') {
        e.preventDefault(); operation('-', (htmlMAX.innerText-htmlMIN.innerText)/2);
    } // dichotomic substraction
    if (e.key === '+' || e.key === 's' || e.key === ' ') {
        e.preventDefault(); operation('+', (htmlMAX.innerText-htmlMIN.innerText)/2);
    } // dichotomic addition
    if (e.key === 'a') { e.preventDefault(); operation('/', 2); }
    if (e.key === 'z') { e.preventDefault(); operation('*', 1.5); }
    if (e.key === 'e') { e.preventDefault(); operation('-', MAX/200*15); }
    if (e.key === 'r') { e.preventDefault(); operation('+', MAX/200*2); }
}



function operation(operator, number) {
    if (boolWin === false) {
    let value = parseInt(input.value) || 0;
    let result = 0;
    switch (operator) {
        case '*': result = value * number; break;
        case '+': result = value + number; break;
        case '-': result = value - number; break;
        case '/': value != 0 ? result = value / number : result = value; break;
        default: result = value; break;
    }
    input.value = Math.floor(result);
    verifNb();
    }
}

function verif() {
    input.value = input.value.replace(/\D+/g, ''); // force numbers
}
function verifNb() {

    // hide all elements first
    document.querySelector("#indicator_more").style.display = "none";
    document.querySelector("#indicator_less").style.display = "none";
    document.querySelector("#indicator_empty").style.display = "none";
    document.querySelector("#indicator_win").style.display = "none";

    // display the element to display
    if (input.value === '') {
        // input.value = '0'
        output.innerText = "Guess the number !"
        document.querySelector("#indicator_empty").style.display = "block";
    } else if (nbToFind > input.value) {
        output.innerText = "Number > " + input.value;
        document.querySelector("#indicator_more").style.display = "block";
        document.querySelector("#indicator_more span").innerText = input.value;
        htmlMIN.innerText = input.value > MIN ? input.value : MIN;
    } else if (nbToFind < input.value) {
        output.innerText = "Number < " + input.value;
        document.querySelector("#indicator_less").style.display = "block";
        document.querySelector("#indicator_less span").innerText = input.value;
        htmlMAX.innerText = input.value < MAX ? input.value : MAX;
    } else {
        output.innerText = "You win !"
        document.querySelector("#indicator_win").style.display = "block";
        htmlMIN.innerText = input.value;
        htmlMAX.innerText = input.value;
        wins = document.querySelector("#wins span").innerText;
        if (boolWin === false) {
        wins++;
        boolWin = true;
        }
        localStorage.setItem("wins",wins);
        document.querySelector("#wins span").innerText = wins;
    }
    if (boolWin === false) { // stop verif counter when win
    nbVerif++;
    infoNbVerif.innerText = nbVerif;
    }
}

/**
 * @param {Number} MIN valeur minimum du nombre aléatoire (inclue)
 * @param {Number} MAX valeur maximum du nombre aléatoire (excluse)
 * @returns {Number} un entier aléatoire entre une valeur MIN (inclue) et une valeur MAX (exclue)
 */
function alea(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
}
