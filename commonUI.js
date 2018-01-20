function setResultPanelText(html){
    document.getElementById("result-panel").innerHTML = html;
}
function disableListeningButton(disabled){
    document.getElementById("start-button").disabled = disabled?"disabled":null;
}
function enableAcceptButton(enabled){
    document.getElementById("accept-button").diabled = false;
}