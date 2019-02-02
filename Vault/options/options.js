

document.getElementById("option-body").onload = function(){
  chrome.storage.sync.get(null, function(items){
    // document.getElementsByTagName('body')[0].innerHTML = JSON.stringify(items)+""
  })
}


