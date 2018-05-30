

chrome.runtime.onInstalled.addListener(function() {
    console.log("what is happening")
    chrome.storage.sync.get('folderId', function(data){
        if(data.folderId == undefined){
            chrome.storage.sync.set({'folderId':data.folderId+1},function(){
                console.log('Added Folder Id :'+(data.folderId+1))
            });
        }else 
            console.log("last folder id :"+data.folderId)
    });
});