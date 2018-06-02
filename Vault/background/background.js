
function Folder(id,name){
    this.id = id
    this.name = name;
    this.files = {};
    this.subFolders = [];
  }
  
  function File(id,desc,link){
    this.id = id
    this.description = desc
    this.link = link
  }

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.clear(function(){
        var error = chrome.runtime.lastError
        if(error)
            console.log("Error while clearing Storage")
        else
            console.log("Storage successfully cleared")
    })
    console.log("Background loaded")
    chrome.storage.sync.set({'0':(new Folder('0',"root"))},function(){
        console.log("root folder set")
    })
    chrome.storage.sync.get('folderId', function(data){
        console.log("getting folderId")
        if(data.folderId === undefined){
            chrome.storage.sync.set({'folderId':0},function(){
                console.log('Initialized last folder Id :'+0)
            })
        }else{
            console.log("last folder id :"+data.folderId)
        }
    });
});