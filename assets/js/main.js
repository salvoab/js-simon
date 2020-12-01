/******************************************************************************************************
 * Simon Says
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

var saimonSaysSequence = getRandomSequence(1, 50, 5);
var elencoIndovinati = [];
var time = 30000; // durante questo tempo (espresso in millisecondi) i numeri devono essere visibili

$(function(){
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
        //Chiedo all'utente i numeri che si ricorda
        var message = $('#message');
        var lastMessage = $('#saimon-said');
        var userNumber;
        for(var i=0; i<saimonSaysSequence.length; i++){
            userNumber = parseInt( prompt("Inserisci un numero che ricordi") );
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