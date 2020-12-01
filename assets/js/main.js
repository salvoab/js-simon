/******************************************************************************************************
 * Esporre all'utente 5 numeri casuali diversi.
 * Dopo 30 secondi l’utente deve inserire, un prompt alla volta, i numeri che ha visto precedentemente.
 * Una volta inseriti i 5 numeri, il software dice quanti e quali numeri sono stati ricordati.
********************************************************************************************************/

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSequence(min, max, sequenceLength){
    var sequence = [];
    var number;
    while(sequence.length !== sequenceLength){
        number = getRandomNumber(min, max);
        if( !sequence.includes(number)){
            sequence.push(number);
        }
    }
    return sequence;
}

//test
var testArray = getRandomSequence(20,100,8);
console.log(testArray);