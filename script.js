output = document.getElementById("output");
input = document.getElementById("input");
infoNbVerif = document.getElementbyId("nbVerif");

nbToFind = alea(0,1000);
nbVerif = 0;
verif();
input.addEventListener("wheel",onWheel)
input.addEventListener("input",verif)

function onWheel(e) {
    e.preventDefault();
    if (e.deltaY > 0) { // on scroll down
        decreaseInput();
    } else if (e.deltaY < 0) { // on scroll up
        increaseInput();
    }
    
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
    infoNbVerif.innerText = nbVerif++;
}

/**
 * @param {Number} MIN valeur minimum du nombre aléatoire (inclue)
 * @param {Number} MAX valeur maximum du nombre aléatoire (excluse)
 * @returns {Number} un entier aléatoire entre une valeur MIN (inclue) et une valeur MAX (exclue)
 */
function alea(MIN,MAX) {
    return Math.floor(Math.random()*(MAX-MIN)+ MIN);
}
