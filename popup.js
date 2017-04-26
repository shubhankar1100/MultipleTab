function loadUrls(){

// fetch urls from textarea and split it
  var urls = document.getElementById('urls').value.split('\n');
 
    // run a loop on the fetched urls
    for(var i=0; i<urls.length; i++){

      // remove the white space from the url
      cleanUrl = urls[i].replace(/\s/g, '');

      // if user input valid urls then open pages
      if(cleanUrl != '') {
         chrome.tabs.create({"url": cleanUrl, "selected": false}); 
      }
     
      // if user input no url
      else {
         document.getElementById('urls').innerHTML = "No value specified";
      }
    }
}


function saveUrls(){

// Fetch urls from textarea and split it
    var urls = document.getElementById('urls').value.split('\n');
    
    var urlsContainer = "";
    
    // run a loop on the fetched urls
    for (i=0; i<urls.length; i++) {


      // if the user input valid urls, save it in local chrome storage
      if(urls[i] != ' ') {
         
         urlsContainer += urls[i] + '\n';
         localStorage['urls'] = urlsContainer;

      }
    }

}

function copyUrls(){

// Fetch urls from current address bar
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
     var url = tabs[0].url +'\n';
     
      var urls = document.getElementById('urls').value.split('\n');
 
 // copies the url in textarea
     document.getElementById('urls').value += url;

});

}


document.addEventListener('DOMContentLoaded', function () {
  
  // add an event listener to load url when button is clicked
  document.getElementById('button').addEventListener('click', loadUrls);
  
  // add an event listener to save url when button is clicked
  document.getElementById('button').addEventListener('click', saveUrls);
    
    // add  current tab url when button is clicked to event listener
    document.getElementById('add').addEventListener('click', copyUrls);
    
    // add an event listener to save url when button is clicked
    document.getElementById('add').addEventListener('click', saveUrls);
    
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
      return;
    }
    document.getElementById('urls').value = urls;


});