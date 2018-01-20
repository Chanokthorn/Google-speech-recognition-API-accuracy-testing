var Datas  = [];
var data = [];

var male = "male";
var female = "female";

var reference = [
    "One thing Mark Zuckerberg has consistently excelled at is destroying his enemies.",
    "Google Plus is no longer viewed as a threat to Facebook.",
    "Now, Zuckerberg is turning his focus to a new enemy.",
    "On Thursday, Facebook announced a major change to News Feed to prioritize posts from friends over posts from publishers.",
    "Even if it ends up helping Facebook's public image, there are other risks.",
    "Artificial intelligence programs built by Alibaba and Microsoft have beaten humans on a reading comprehension test.",
    "The technology can be gradually applied to numerous applications.",
    "The Stanford test generates questions about a set of Wikipedia articles.",
    "Beijing said it wants the country to be a leader in artificial intelligence.",
    "North and South Korea are discussing fielding a joint ice hockey team."
];

function readTextFile()
{
    // file = document.getElementById('file-name').value;
    file = 'a.txt';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                // console.log(allText);
                data = JSON.parse(allText);
                // console.log(data[0]);
            }
        }
    }
    rawFile.send(null);
    // console.log(data);
    Datas = Datas.concat(data);
    // console.log(Datas);
}

function calculate(){
    var utter_accuracy = calculateUtterAccuracy();
    var word_accuracy = calculateWordAccuracy();
    console.log('male: ',utter_accuracy.male,' female: ',utter_accuracy.female);
    console.log('male: ',word_accuracy.male,' female: ',word_accuracy.female);
    document.getElementById('utterance-male-accuracy').innerHTML = utter_accuracy.male;
    document.getElementById('utterance-female-accuracy').innerHTML = utter_accuracy.female;
    document.getElementById('word-male-accuracy').innerHTML = word_accuracy.male;
    document.getElementById('word-female-accuracy').innerHTML = word_accuracy.female;
}

function calculateUtterAccuracy(){
    var amount = Datas.length;
    var utter_acc = { male: 0, female: 0};
    var counter = { male: 0, female: 0 } 
    for(i=0; i < amount; i++){
        var utter = String(Datas[i].utter);
        var forReference = parseInt(Datas[i].utter) - 1;
        // console.log('forReference:',forReference);
        var recog = (Datas[i].recog).replace(/[^a-zA-Z ]/g, "");
        var toCompare = (reference[forReference]).replace(/[^a-zA-Z ]/g, "");
        // console.log('recog:',recog);
        // console.log('tocompare:',toCompare);
        if(Datas[i].gender == male){
            // console.log('male');
            counter.male += 1;
            if(recog == toCompare){ utter_acc.male += 1; }
        }
        else{
            // console.log('female');
            counter.female += 1;
            if(recog == toCompare){ utter_acc.female += 1; }
        }
    }
    utter_acc.male = utter_acc.male / counter.male * 100;
    utter_acc.female = utter_acc.female / counter.female * 100;
    return utter_acc;

}

function calculateWordAccuracy(){
    var amount = Datas.length;
    var word_acc = { male: 0, female: 0};
    var counter = { male: 0, female: 0 } 
    for(i=0; i < amount; i++){
        var utter = String(Datas[i].utter);
        var forReference = parseInt(Datas[i].utter) - 1;
        // console.log('forReference:',forReference);
        var recog = (Datas[i].recog).replace(/[^a-zA-Z ]/g, "");
        recog = recog.split(" ");
        var toCompare = (reference[forReference]).replace(/[^a-zA-Z ]/g, "");
        toCompare = toCompare.split(" ");
        // console.log('recog:',recog);
        // console.log('tocompare:',toCompare);
        if(Datas[i].gender == male){
            counter.male += toCompare.length;
            word_acc.male += longestCommonSubsequence(recog,toCompare);
        }
        else{
            counter.female += toCompare.length;
            word_acc.female += longestCommonSubsequence(recog,toCompare);
        }
    }
    word_acc.male = word_acc.male / counter.male * 100;
    word_acc.female = word_acc.female / counter.female * 100;
    return word_acc;
}

