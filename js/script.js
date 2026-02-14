document.querySelector("#version").innerText += "\nJS_2026-02-14_21:22"
const HTML_OUTPUT = document.getElementById("output");
const HTML_INPUT = document.getElementById("input");
const HTML_INFO_NB_VERIF = document.getElementById("nbVerif");
const HTML_MIN = document.getElementById("min");
const HTML_MAX = document.getElementById("max");
const HTML_RELOAD_BUTTON = document.getElementById("reload");
const HTML_WINS = document.querySelector("#wins span");
let MIN = 0;
let MAX = 1000;
let nbToFind = 0;
let nbVerif = 0;
let wins = 0;
let boolWin = false;
HTML_RELOAD_BUTTON.addEventListener('click', (e) => { init(); });
init();

function init() {
    wins = parseInt(localStorage.getItem("wins")) || 0;
    boolWin = false;
    HTML_MIN.innerText = MIN;
    HTML_MAX.innerText = MAX;
    nbToFind = alea(MIN, MAX);
    nbVerif = -1;
    HTML_INPUT.value = MAX;
    removeLetters();
    verifNb();
    HTML_INFO_NB_VERIF.innerText = "0";
    HTML_WINS.innerText = wins;
}

// https://stackoverflow.com/questions/5961333/prevent-default-action-for-tab-key-in-chrome#:~:text=need%20to%20call%20the%20event%20on%20keydown
// Already on keydown so why ??
// document.addEventListener('keydown', function (e) {  verifKey(e); }); // doesn't work on chrome mobile ?

// https://stackoverflow.com/questions/36753548/keycode-on-android-is-always-229#:~:text=keypress,-%2E
document.addEventListener('keydown', function (e) {  verifKey(e); });

// focus INPUT
// document.addEventListener('keydown', function (e) {  HTML_INPUT.focus(); });
// input.keydown(function (e) {  verifKey(e); }) // jQuery only also input already exists ??
// https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event#browser_compatibility:~:text=onkeydown
// onkeydown =  (e) => {  verifKey(e); };
// HTML_INPUT.addEventListener('keydown', function (e) {  verifKey(e); });
function verifKey(e) {
    if (e.key === 'Enter' || e.key === 'Tab' || e.keyCode === 9) { e.preventDefault(); verifNb(); }
    if (e.key === 'n' || e.key === 'c' || e.key === '.') { e.preventDefault(); init(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); operation('+', MAX / 20); }
    //if (e.key === 'ArrowRight') {e.preventDefault(); operation('+', MAX / 20);}
    if (e.key === 'ArrowDown') { e.preventDefault(); operation('-', MAX / 20); }
    //if (e.key === 'ArrowLeft') {e.preventDefault(); operation('-', MAX / 20);}
    if (e.key === '-' || e.key === 'q') { // dichotomic substraction
        // HTML_OUTPUT.style.display = "block";
        HTML_OUTPUT.innerText = "You pressed - "
        e.preventDefault();
        operation('-', (HTML_MAX.innerText-HTML_MIN.innerText)/2);
    } else {
        // HTML_OUTPUT.style.display = "block";
        HTML_OUTPUT.innerText = "You pressed " + e.key;
    }
    if (e.key === '+' || e.key === 's' || e.key === ' ') {
        e.preventDefault();
        operation('+', (HTML_MAX.innerText-HTML_MIN.innerText)/2);
    } // dichotomic addition
    if (e.key === 'a') { e.preventDefault(); operation('/', 2); }
    if (e.key === 'z') { e.preventDefault(); operation('*', 1.5); }
    if (e.key === 'e') { e.preventDefault(); operation('-', MAX/200*15); }
    if (e.key === 'r') { e.preventDefault(); operation('+', MAX/200*2); }
}
function dichotomic(operator) {
    operation(operator, (HTML_MAX.innerText-HTML_MIN.innerText)/2));
    // operation('+', (HTML_MAX.innerText-HTML_MIN.innerText)/2);
 // dichotomic 
}

// https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string#:~:text=substring
// HTML_INPUT.addEventListener("input", (e) => {
//     lastChar = HTML_INPUT.value
//     if ()
// });
HTML_INPUT.addEventListener("wheel", onWheel)
function onWheel(e) {
    e.preventDefault();
    if (e.deltaY > 0) { // on scroll down
        operation('-', MAX / 20);
    } else if (e.deltaY < 0) { // on scroll up
        operation('+', MAX / 20);
    }
}

function operation(operator, number) {
    if (boolWin === false) {
    let value = parseInt(HTML_INPUT.value) || 0;
    let result = 0;
    switch (operator) {
        case '*': result = value * number; break;
        case '+': result = value + number; break;
        case '-': result = value - number; break;
        case '/': value != 0 ? result = value / number : result = value; break;
        default: result = value; break;
    }
    HTML_INPUT.value = Math.floor(result);
    verifNb();
    }
}

function removeLetters() {
    HTML_INPUT.value = HTML_INPUT.value.replace(/\D+/g, ''); // force numbers
    // .replace(/\D/g, ''):
    //     \D: This is a shorthand character class that matches any character that is not a digit.
    //     g: This global flag ensures that all occurrences in the string are replaced, not just the first one.
    //     '': This means that every non-digit character found will be replaced with an empty string, effectively removing it from the input.

    // HTML_INPUT.value = HTML_INPUT.value.match(/[0-9]+/); // force numbers // less performant, less compatibility
}
function verifNb() {

    removeLetters();

    // hide all elements first
    document.querySelector("#indicator_more").style.display = "none";
    document.querySelector("#indicator_less").style.display = "none";
    document.querySelector("#indicator_empty").style.display = "none";
    document.querySelector("#indicator_win").style.display = "none";

    // display the element to display
    if (HTML_INPUT.value === '') {
        // input.value = '0'
        // HTML_OUTPUT.innerText = "Guess the number !"
        document.querySelector("#indicator_empty").style.display = "block";
    } else if (nbToFind > HTML_INPUT.value) {
        // HTML_OUTPUT.innerText = "Number > " + HTML_INPUT.value;
        document.querySelector("#indicator_more").style.display = "block";
        document.querySelector("#indicator_more span").innerText = HTML_INPUT.value;
        HTML_MIN.innerText = HTML_INPUT.value > MIN ? HTML_INPUT.value : MIN;
    } else if (nbToFind < HTML_INPUT.value) {
        // HTML_OUTPUT.innerText = "Number < " + HTML_INPUT.value;
        document.querySelector("#indicator_less").style.display = "block";
        document.querySelector("#indicator_less span").innerText = HTML_INPUT.value;
        HTML_MAX.innerText = HTML_INPUT.value < MAX ? HTML_INPUT.value : MAX;
    } else {
        // HTML_OUTPUT.innerText = "You win !"
        document.querySelector("#indicator_win").style.display = "block";
        HTML_MIN.innerText = HTML_INPUT.value;
        HTML_MAX.innerText = HTML_INPUT.value;
        wins = HTML_WINS.innerText;
        if (boolWin === false) {
        wins++;
        boolWin = true;
        }
        localStorage.setItem("wins",wins);
        HTML_WINS.innerText = wins;
    }
    if (boolWin === false) { // stop verif counter when win
    nbVerif++;
    HTML_INFO_NB_VERIF.innerText = nbVerif;
    }
}

/**
 * @param {Number} MIN valeur minimum du nombre aleatoire (inclue)
 * @param {Number} MAX valeur maximum du nombre aleatoire (excluse)
 * @returns {Number} un entier aleatoire entre une valeur MIN (inclue) et une valeur MAX (exclue)
 */
function alea(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
}
