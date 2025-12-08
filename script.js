const MIN = 0;
const MAX = 1000;

const output = document.getElementById("output");
const input = document.getElementById("input");
const infoNbVerif = document.getElementById("nbVerif");
//document.getElementById("version").innerText = "v2025-12-08-21h04"
//const reloadButton = document.getElementById("reload");
//document.addEventListener('click', (e) => {init();});


let nbToFind = 0;
let nbVerif = 0;
nbToFind = alea(MIN,MAX);
nbVerif = -1;
verif();
input.value = MAX;
verifNb();
infoNbVerif.innerText = "0";
input.addEventListener("wheel",onWheel)
input.addEventListener("input",verif)



document.addEventListener('keydown', function(e) {
    verifKey(e);
});
function verifKey(e) {
    if (e.key === 'Enter') {
        verifNb();
    }
    //if (e.key === 'ArrowUp') {operation('+',1);}
    if (e.key === 'ArrowRight') {
        operation('+',MAX/20);
    }
    //if (e.key === 'ArrowDown') {operation('-',1);}
     if (e.key === 'ArrowLeft') {
        operation('-',MAX/20);
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

function operation(operator, number) {
    let value = parseInt(input.value) || 0;
    let result = 0;
    switch (operator) {
        case '*' : result = value * number; break;
        case '+' : result = value + number; break;
        case '-' : result = value - number; break;
        case '/' : value != 0 ? result = value / number : result = value; break;
        default : result = value; break;
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
    } else if (input.value > nbToFind) {
        output.innerText = "Number < " + input.value;
        document.getElementById("max").innerText = input.value;
    } else if (input.value < nbToFind) {
        output.innerText = "Number > " + input.value;
        document.getElementById("min").innerText = input.value;
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
