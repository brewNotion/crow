
function Folder(id,name){
    this.id = id
    this.name = name;
    this.files = {};
    this.subFolders = [];
  }
  
  function File(id,desc,link,dateTime){
    this.id = id
    this.description = desc
    this.link = link
    this.lastReadDate = dateTime
  }

var getFolderJson = function(id, folder){
    var folderJson = {}
    folderJson[id] = folder
    return folderJson
}
let bAddFolder = document.getElementById('b-add-folder')
let folderList = document.getElementById('folder-list')

var addFolder = function(folder,parent){
    var newLi = document.createElement('li');
    newLi.innerHTML = "<input type='checkbox' value='"+folder.id+"'><span>"+folder.name+"</span>"
    parent.appendChild(newLi)
    return newLi
}
var displayFolders = function(id,parentLi){
    id = id.toString()
    chrome.storage.sync.get(id, function(data){
        var folder = data[id]
        var currentLi = addFolder(folder,parentLi)
        if(folder.subFolders.length === 0)
            return
        else{
            var currentUi = document.createElement('ul')
            currentLi.appendChild(currentUi)
            folder.subFolders.forEach(function(subId){
                displayFolders(subId,currentUi)
            })
        }
    })
}

document.getElementById("popup-body").onload = function(){
    displayFolders(0,folderList)
}

bAddFolder.onclick = function(element){
    var folderName = document.getElementById("i-folder-name").value
    if(folderName === ""){alert('Give proper name');return}
    chrome.storage.sync.get('folderId',function(data){
        var fId = (parseInt(data.folderId)+1).toString()
        //for sending a message
        var checkedboxes = document.querySelectorAll("input[type='checkbox']:checked");
        if(checkedboxes.length == 0)
            alert("select a folder/tag")
        else{
            folderList.innerHTML = ""
            checkedboxes.forEach(function(cb){
                console.log("cb.value is"+cb.value)
                chrome.storage.sync.get(cb.value, function(folder){
                    console.log('Adding to subfolder')
                    folder = folder[cb.value]
                    folder.subFolders.push(fId)
                    chrome.storage.sync.set(getFolderJson(cb.value, folder),function(){
                        console.log('parent added to subfolder')
                    })
                })
            })
            chrome.storage.sync.set({'folderId':fId}, function(){
                console.log('folder Id updated to '+fId)
            })
            chrome.storage.sync.set(getFolderJson(fId, new Folder(fId,folderName)),function(error){ 
                displayFolders('0', folderList)
            })
        }
    });
}

document.getElementById('b-add-file').onclick = function(){
    var checkedboxes = document.querySelectorAll("input[type='checkbox']:checked")
    if(checkedboxes.length === 0){
        alert("select a folder")
    }else{
        chrome.tabs.query({active:true}, function(tb){
            tb = tb[0]
            var file = new File(-1,tb.title, tb.url, Date.now())
            checkedboxes.forEach(function(cb){
                chrome.storage.sync.get(cb.value, function(data){
                    var folder = data[cb.value.toString()]
                    file.id = Object.keys(folder.files).length
                    folder.files[file.id] = file
                    chrome.storage.sync.set(getFolderJson(cb.value, folder))
                })
            })
        })
    }
}