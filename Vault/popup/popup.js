

let bAddFolder = document.getElementById('b-add-folder')
let folderList = document.getElementById('folder-list')

bAddFolder.onclick = function(element){
    var folderName = document.getElementById("i-folder-name").value
    chrome.storage.sync.get('folderId',function(data){
        fId = data.folderId + 1
        chrome.storage.sync.set({fId:folderName},function(){
            alert('Added fodler:'+fId+'->'+folderName)
        })
        chrome.storage.sync.set({'folderId':fId}, function(){
            console.log('folder Id updated to '+fId)
        })
        var newFolder = document.createElement('li');
        newFolder.innerHTML = "<checkbox value="+fId+"><span>"+folderName+"<span>"
        folderList.appendChild(newFolder)
    });
}