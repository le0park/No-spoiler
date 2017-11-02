var xhr = new XMLHttpRequest();
var clientId = 'z3PC0R7c9QUP9GqOXffK';
var clientSecret = 'DKRegT6p7Z';
var resp;

function onWindowLoad() {
  document.getElementById("search").addEventListener("click", search_movie);
}

function search_movie(){
  var query = document.getElementById('query').value;

  xhr.open("GET", 'https://openapi.naver.com/v1/search/movie.json'
                + '?query=' + encodeURI(query) , true);
  xhr.setRequestHeader("X-Naver-Client-Id", clientId);
  xhr.setRequestHeader("X-Naver-Client-Secret", clientSecret);
  xhr.send();

  xhr.onreadystatechange = function(){
    if (chrome.extension.lastError) {
        document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }else {

      if(xhr.readyState == 4 && this.status == 200){
          resp = this.response;
          if (resp !== undefined){
            obj = JSON.parse(resp);
<<<<<<< Updated upstream
            for(i=0; i<obj.total; i++)
            {
                var tempDiv = document.createElement("div");
                var keyName = 'list';
                var tempHash = JSON.stringify(obj.items[i]);
                tempDiv.id = 'filter';
                tempDiv.innerHTML = '제목 :' + '<a href=""' + obj.items[i].title + '<a/>'
                                    + '<br/>' + '개봉년도 : ' + obj.items[i].pubDate + '<br/>'
                                    + '감독 : ' + obj.items[i].director + '<br/>'
                                    + '배우 : ' + obj.items[i].actor
                                    + '<br/>' + '<br/>';
                tempDiv.onclick = function(){
                    chrome.storage.local.get({filter:[]}, function(result){
                        var filterList = result.filter;
                        filterList.push(tempHash);
                        chrome.storage.local.set({filter:filterList}, function(){
                            chrome.storage.local.get('filter', function (result) {
                                console.log(result.filter)
                            });
                        });
                    });
                }
                document.body.appendChild(tempDiv);
                // //document.write('제목 : ' + obj.items[i].title + '<br/>');
                // document.write('제목 :' + '<a href=""' + obj.items[i].title + '<a/>');
                // document.write('<br/>' + '개봉년도 : ' + obj.items[i].pubDate + '<br/>');
                // document.write('감독 : ' + obj.items[i].director + '<br/>');
                // document.write('배우 : ' + obj.items[i].actor);
                // //var addButton = document.createElement('button');
                // //var addButtonText = document.createTextNode('Add');
                // //  addButton.appendChild(addButtonText);
                // //document.body.appendChild(addButton);
                // document.write('<br/>' + '<br/>');
                // document.write('</div>');
=======

            for(i=0;i<obj.total;i++)
            {
              document.write('제목 :' + '<a href=""' + obj.items[i].title + '<a/>');
              document.write('<br/>' + '개봉년도 : ' + obj.items[i].pubDate + '<br/>');
              document.write('감독 : ' + obj.items[i].director + '<br/>');
              document.write('배우 : ' + obj.items[i].actor);
              document.write('<br/>' + '<br/>');
>>>>>>> Stashed changes
            }
          }
        }
    }
  }
}





window.onload = onWindowLoad;
