
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

let bAddFolder = document.getElementById('b-add-folder')
let folderList = document.getElementById('folder-list')

var appendFolder = function(id){
    id = id.toString()
    chrome.storage.sync.get(id, function(data){
        var folder = data[id]
        var newLi = document.createElement('li');
        newLi.innerHTML = "<input type='checkbox' value='"+id+"'><span>"+folder.name+"</span>"
        folderList.appendChild(newLi)
    })
}

document.getElementById("popup-body").onload = function(){
    chrome.storage.sync.get('folderId',function(data){
        var folderId = parseInt(data.folderId)
        
        for(i=0; i<=folderId; i++){
            appendFolder(i)
        }
    });
}

bAddFolder.onclick = function(element){
    var folderName = document.getElementById("i-folder-name").value
    chrome.storage.sync.get('folderId',function(data){
        var fId = (parseInt(data.folderId)+1).toString()
        //for sending a message
        var folderJson =  {}
        folderJson[fId] = (new Folder(fId,folderName))
        chrome.storage.sync.set(folderJson,function(error){
            
            appendFolder(fId)

            chrome.storage.sync.set({'folderId':fId}, function(){
                console.log('folder Id updated to '+fId)
            })
        })
    });
}