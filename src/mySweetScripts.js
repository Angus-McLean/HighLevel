



var textbox = document.getElementById('textbox');
var mybutton = document.getElementById('mybutton');
var username_input = document.getElementById('username_input');

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

recognition.onresult = function(event) {
    console.log('recog event', event);
    // console.log('You said: ', event.results[0][0].transcript);
    textbox.innerText = event.results[0][0].transcript;

    writeNewVoiceRec(username_input.value, event.results[0][0].transcript);
};

mybutton.onclick = function (event) {
  // console.log('My Event : ', event);
  recognition.start();
}

function writeNewVoiceRec(name, voiceMessage) {
  firebase.database().ref('messages/' + Date.now()).set({
    username: name,
    text : voiceMessage
  });
}
