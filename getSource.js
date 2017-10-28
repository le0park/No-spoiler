var xhr = new XMLHttpRequest();
var clientId = 'z3PC0R7c9QUP9GqOXffK';
var clientSecret = 'DKRegT6p7Z';
var resp;

function onWindowLoad() {
  document.getElementById("search").addEventListener("click", search_movie);
}

function search_movie(){
  var query = document.getElementById('query').value;

  xhr.open("GET", 'https://openapi.naver.com/v1/search/movie.json' + '?query=' + query, true);
  xhr.setRequestHeader("X-Naver-Client-Id", clientId);
  xhr.setRequestHeader("X-Naver-Client-Secret", clientSecret);
  xhr.send();

  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && this.status == 200){
          resp = this.response;
          if (resp !== undefined){
              document.body.innerText = resp.source;
              }
          }
      }
  }

  /*chrome.extension.onMessage.addListener(function(request, sender) {
      if (request.action == "getSource") {
          document.body.innerText = request.source;
      }
  });*/





window.onload = onWindowLoad;










// function get_source(document_body){
//     return document_body.innerText;
// }
