let MIN = 0;
let MAX = 1000;
let nbToFind = 0;
let nbVerif = 0;
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
    htmlMIN.innerText = MIN;
    htmlMAX.innerText = MAX;
    nbToFind = alea(MIN, MAX);
    nbVerif = -1;
    verif();
    input.value = MAX;
    verifNb();
    infoNbVerif.innerText = "0";
}

input.addEventListener("input", verif)
input.addEventListener("wheel", onWheel)
function onWheel(e) {
    e.preventDefault();
    if (e.deltaY > 0) { // on scroll down
        operation('-',MAX/20);
    } else if (e.deltaY < 0) { // on scroll up
        operation('+',MAX/20);
    }
}

document.addEventListener('keydown', function (e) {
    verifKey(e);
});
function verifKey(e) {
    if (e.key === 'Enter') {
        verifNb();
    }
    if (e.key === 'ArrowUp') {operation('+', MAX / 20);}
    //if (e.key === 'ArrowRight') {operation('+', MAX / 20);}
    if (e.key === 'ArrowDown') {operation('-', MAX / 20);}
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
    if (input.value === '') {
        // input.value = '0'
        output.innerText = "Guess the number !"
    } else if (nbToFind > input.value) {
        output.innerText = "Number > " + input.value;
       htmlMIN.innerText = input.value;
    } else if (nbToFind < input.value) {
        output.innerText = "Number < " + input.value;
        htmlMAX.innerText = input.value;
    } else {
        output.innerText = "You guessed right ! You Win !"
        htmlMIN.innerText = input.value;
        htmlMAX.innerText = input.value;
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
