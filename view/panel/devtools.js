document.querySelector('#updateButton').addEventListener('click', ()=> {
    searchExpression();
});

function searchExpression(){
    chrome.devtools.inspectedWindow.eval(
        "jQuery.fn.jquery",
        function(result, isException) {
            _tabId = chrome.devtools.inspectedWindow.tabId
            console.log(_tabId);
            
            if (isException){
                console.log("the page is not using jQuery");
                document.querySelector('#result').innerHTML = "<h1>the page is not using jQuery</h1>";
            }else{
                document.querySelector('#result').innerHTML = "<h1>The page is using jQuery v" + result + "</h1>";
                console.log("The page is using jQuery v" + result);
            }
        }
    );
}
