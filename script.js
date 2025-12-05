const MIN = 0;
const MAX = 1000;

const output = document.getElementById("output");
const input = document.getElementById("input");
const infoNbVerif = document.getElementById("nbVerif");

let nbToFind = alea(MIN,MAX);
let nbVerif = 0;
verif();
input.addEventListener("wheel",onWheel)
input.addEventListener("input",verif)
/*document.addEventListener('keydown', function(e) => {
    verifKey(e)
});*/

input.value = MAX;
infoNbVerif.innerText = "0";

function verifKey(e) {
    if (e.key == 'Enter') {
        verif();
    }
    if (e.key == 'ArrowUp') {
        increaseInput();
    }
    if (e.key == 'ArrowDown') {
        decreaseInput();
    }
    
}

function onWheel(e) {
    e.preventDefault();
    if (e.deltaY > 0) { // on scroll down
        decreaseInput();
    } else if (e.deltaY < 0) { // on scroll up
        increaseInput();
    }
    
}

function multiplyTwo() {
    let multiply = parseInt((input.value+1) * 2, 10);
    input.value = Math.floor(multiply);
    verifNb();
}

function divideTwo() {
    let divide = parseInt((input.value+1) / 2, 10);
    input.value = Math.floor(divide);
    verifNb();
}

function increaseInput() {
    input.value++;
    verif();
}

function decreaseInput() {
    input.value--;
    verif();
}
function verif() {
    input.value = input.value.replace(/\D+/g, ''); // force numbers
}
function verifNb() {
    if (input.value === '') {
        // input.value = '0'
        output.innerText = "Find the number :"
    } else if (input.value > nbToFind) {
        output.innerText = "Number to find is less than " + input.value;
    } else if (input.value < nbToFind) {
        output.innerText = "Number to find is more than " + input.value;
    } else {
        output.innerText = "You guessed right !"
    }
    nbVerif++;
    infoNbVerif.innerText = nbVerif;
}

/**
 * @param {Number} MIN valeur minimum du nombre aléatoire (inclue)
 * @param {Number} MAX valeur maximum du nombre aléatoire (excluse)
 * @returns {Number} un entier aléatoire entre une valeur MIN (inclue) et une valeur MAX (exclue)
 */
function alea(MIN,MAX) {
    return Math.floor(Math.random()*(MAX-MIN)+ MIN);
}
