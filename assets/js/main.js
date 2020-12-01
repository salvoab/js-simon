/******************************************************************************************************
 * Simon Says
 * Esporre all'utente 5 numeri casuali diversi.
 * Dopo 30 secondi l’utente deve inserire, un prompt alla volta, i numeri che ha visto precedentemente.
 * Una volta inseriti i 5 numeri, il software dice quanti e quali numeri sono stati ricordati.
********************************************************************************************************/
/**
 * Genera un numero casuale intero compreso fra due estremi.
 * 
 * @param {number} min Minimo numero intero generabile.
 * @param {number} max Massimo numero intero generabile.
 * @return {number} - Numero generato randomicamente
 */
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Genera un array di numeri interi casuali compresi fra un minimo e un massimo.
 * 
 * @param {number} min Minimo numero intero casuale generabile all'interno dell'array.
 * @param {number} max Massimo numero intero casuale generabile all'interno dell'array.
 * @param {number} sequenceLength Lunghezza dell'array da generare.
 * @return {array} - Array di numeri casuali
 */
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

/**
 * Richiede un numero tramite prompt e lo restituisce solo quando il valore inserito è effettivamente un numero.
 * Il messaggio da mostrare nel prompt è richiesto come parametro.
 * 
 * @param {string} message Stringa di testo da inserire nel prompt
 * @return {number} - Numero inserito dall'utente.
 */
function getPromptedNumber(message){
    do{
        var invalidInput = false;
        var number = parseInt(prompt(message));
        if(number === null || isNaN(number)){
            alert("Attenzione! Puoi inserire solo un valore numerico");
            invalidInput = true;
        }
    }while(invalidInput);
    
    return number;
}

var saimonSaysSequence = getRandomSequence(1, 50, 5);
var elencoIndovinati = [];
var time = 30000; // durante questo tempo (espresso in millisecondi) i numeri devono essere visibili

$(function(){
    /**
     * Mostra all'utente un array di numeri. Per il corretto funzionamento richiede un elemento html con id message.
     * 
     * @param {array} numbers Array contenente i numeri da mostrare
     */
    function showNumbers(numbers){
        var message = $('#message');
        for(var i = 0; i<numbers.length; i++){
            message.append(numbers[i] + " " );
        }
    }
    showNumbers(saimonSaysSequence);

    //Cancello i numeri mostrati all'utente dopo 30 secondi
    setTimeout(function () {
        $('#message').text(" ");
    }, time);

    //Chiedo all'utente i numeri che si ricorda dopo 30.2 secondi
    //Ho scelto questo approccio di separare cancellazione e prompt perché i prompt inseriti nel precedente setTimeout lasciavano visibili i numeri durante la fase di inserimento
    setTimeout(function () {
        var message = $('#message');
        var lastMessage = $('#saimon-said');
        var userNumber;
        for(var i=0; i<saimonSaysSequence.length; i++){
            userNumber = getPromptedNumber("Inserisci un numero che ti ricordi");
            if(saimonSaysSequence.includes(userNumber) && !elencoIndovinati.includes(userNumber)){
                elencoIndovinati.push(userNumber);
            }
            //preparo il messaggio finale
            lastMessage.append(" " + saimonSaysSequence[i]);
        }
        message.text("Hai indovito " + elencoIndovinati.length + " numeri su 5");
        if(elencoIndovinati.length > 0 ){
            message.append(" e sono: ");
        }
        for(var i=0; i<elencoIndovinati.length; i++){
            message.append(elencoIndovinati[i] + " ");
        }
        //Mostro il messaggio finale
        lastMessage.show();
    }, time+200);
});