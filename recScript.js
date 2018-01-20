var recognition;

initRecognizer();

var Datas = [];

var data = {};

function initRecognizer(){
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.onresult = function(event) {
        handleResult(event.results);
        //testing(event.results);
        // Datas.push(event.results);
    };

    recognition.onend = function(event){
        disableListeningButton(false);
        initRecognizer();
    };
}
function startRecognition(){
    handleResult('One thing Mark Zuckerberg has consistently excelled at is destroying his enemies.');
    // setResultPanelText("");
    // disableListeningButton(true);
    // recognition.start();
}
function handleResult(results){
    console.log(results);
    // setResultPanelText(event.results[0][0].transcript);
    // const result = event.results[0][0].transcript
    const result = results;
    const utter = document.getElementById('utter').value;
    const gender = document.getElementById('gender').value;
    data = {recog:result, utter:utter, gender: gender};
    const html = "utter: " + data.utter + " gender: " + data.gender + ' result: ' + data.recog;
    setResultPanelText(html);
    enableAcceptButton(true);
    console.log("enabled");    
}

function addRecognition(){
    console.log("called");
    console.log(data);
    Datas.push(data);
    setResultPanelText("added.");
}

function saveRecognition(){
    var fileName = document.getElementById('file-name').value + '\.txt';
    var dataToStore = JSON.stringify(Datas);
    localStorage.setItem(fileName,dataToStore);
    SaveAsFile(dataToStore,fileName,"text/plain;charset=utf-8");
    console.log(dataToStore);
    setResultPanelText('saved.');
}

function SaveAsFile(t,f,m) {
    try {
        var b = new Blob([t],{type:m});
        saveAs(b, f);
    } catch (e) {
        window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
}

// var checkIntrerval = setInterval(() => {
//     if(Datas.length == 20) {
//         //Do somethinng
//         clearInterval(checkIntrerval);
//     }
//     console.log("B-Bone is here", Datas)
// }, 500);

function saveResult(results){
    data = [];
}