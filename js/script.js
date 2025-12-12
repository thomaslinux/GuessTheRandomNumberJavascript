let MIN = 0;
let MAX = 1000;
let nbToFind = 0;
let nbVerif = 0;
let wins = 0;
const output = document.getElementById("output");
const input = document.getElementById("input");
const infoNbVerif = document.getElementById("nbVerif");
const htmlMIN = document.getElementById("min");
const htmlMAX = document.getElementById("max");
const reload = document.getElementById("reload");
reload.addEventListener('click', (e) => { init(); });
// window.onload = init;
init();

function init() {
    wins = parseInt(localStorage.getItem("wins")) || 0;
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

document.addEventListener('keydown', function (e) {
    verifKey(e);
});
function verifKey(e) {
    if (e.key === 'Enter') {
        verifNb();
    }
    if (e.key === 'n' || e.key === ' ') {
        init();
    }
    if (e.key === 'ArrowUp') { operation('+', MAX / 20); }
    //if (e.key === 'ArrowRight') {operation('+', MAX / 20);}
    if (e.key === 'ArrowDown') { operation('-', MAX / 20); }
    //if (e.key === 'ArrowLeft') {operation('-', MAX / 20);}

}



function operation(operator, number) {
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
        htmlMIN.innerText = input.value;
    } else if (nbToFind < input.value) {
        output.innerText = "Number < " + input.value;
        document.querySelector("#indicator_less").style.display = "block";
        document.querySelector("#indicator_less span").innerText = input.value;
        htmlMAX.innerText = input.value;
    } else {
        output.innerText = "You win !"
        document.querySelector("#indicator_win").style.display = "block";
        htmlMIN.innerText = input.value;
        htmlMAX.innerText = input.value;
        wins = document.querySelector("#wins span").innerText;
        wins++;
        localStorage.setItem("wins",wins);
        document.querySelector("#wins span").innerText = wins;
    }
    nbVerif++;
    infoNbVerif.innerText = nbVerif;
}

/**
 * @param {Number} MIN valeur minimum du nombre aléatoire (inclue)
 * @param {Number} MAX valeur maximum du nombre aléatoire (excluse)
 * @returns {Number} un entier aléatoire entre une valeur MIN (inclue) et une valeur MAX (exclue)
 */
function alea(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
}
