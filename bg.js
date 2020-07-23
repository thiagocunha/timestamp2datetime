chrome.browserAction.onClicked.addListener(
    function(tab) { 
            chrome.tabs.executeScript({
                file: 'content.js'
              });
  
            setTimeout(function(){chrome.tabs.sendMessage(tab.id, {action: "convert"});}, 500);
        }
    );

