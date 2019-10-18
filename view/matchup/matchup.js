var tabId = chrome.devtools.inspectedWindow.tabId

function matching(user){
    chrome.tabs.executeScript(tabId, {
        code:'document.querySelector("body").innerText'
    }, result=>{
        console.log(result)
        var bodyNum = result[0].split(' ').length;
        
        var myNum = 0;
        matchedStr = result[0].match(new RegExp('\\b('+user+')\\b', 'gi'))
        if(matchedStr != "" && matchedStr != null && matchedStr != undefined){
            myNum = matchedStr.length;
        }
        var percent = (myNum/bodyNum*100).toFixed(1);
        document.querySelector("#result").innerText = myNum+'/'+bodyNum+'('+(percent)+'%)';
    });
}

chrome.storage.sync.get((data)=>{
    document.querySelector('#user').value = data.userWords;
    matching(data.userWords);
});

document.querySelector('#user').addEventListener('change', ()=> {
    var user = document.querySelector('#user').value;
    chrome.storage.sync.set({
        userWords: user
    });
    matching(user);
});
