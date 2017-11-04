var xhr = new XMLHttpRequest();
var clientId = 'z3PC0R7c9QUP9GqOXffK';
var clientSecret = 'DKRegT6p7Z';
var div_list_arr = [];

function onWindowLoad() {
  document.getElementById("search").addEventListener("click", search_movie);
  chrome.storage.local.get('filter', function (result) {
    var list = result.filter;
    if(list != undefined){
      for (var i=0; i<list.length; i++){
        var parseObj = JSON.parse(list[i]);
        var element = document.createElement("b");
        element.id = "prevent_list" + i;
        element.innerHTML = '제목 :' + '<a href=""' +parseObj.title + '</a>'
        + '<button id="delete' + i + '">x</button>'
          + '<br/>' + '개봉년도 : ' + parseObj.pubDate + '<br/>'
          + '감독 : ' + parseObj.director + '<br/>'
          + '배우 : ' + parseObj.actor
          + '<br/>' + '<br/>';
        element.querySelector("#delete" + i).onclick = function(){
          var index = Number(this.id.substring());
          this.parentElement.style.display = "none";
          chrome.storage.local.get({ filter: [] }, function (result) {
            var filterList = result.filter;
            filterList.splice(index, 1);
            chrome.storage.local.set({ filter: filterList }, function () {
              chrome.storage.local.get('filter', function (result) {
                console.log(result.filter)
              });
            });
          });
        };
        console.log(parseObj);
        var Ground = document.getElementById("ground");
        Ground.appendChild(element);
      }
      console.log(list);
    }
  });
}

function search_movie() {
  var query = document.getElementById('query').value;

  xhr.open("GET", 'https://openapi.naver.com/v1/search/movie.json'
    + '?query=' + encodeURI(query), true);
  xhr.setRequestHeader("X-Naver-Client-Id", clientId);
  xhr.setRequestHeader("X-Naver-Client-Secret", clientSecret);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (chrome.extension.lastError) {
      document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    } else {

      if (xhr.readyState == 4 && this.status == 200) {
        resp = this.response;
        if (resp !== undefined) {
          obj = JSON.parse(resp);

          for (i = 0; i < obj.display; i++) {
            var tempDiv = document.createElement("b");
            var keyName = 'list';
            tempDiv.id = 'filter' + i;
            tempDiv.innerHTML = '제목 :' + '<a href=""' + obj.items[i].title + '</a>'
              + '<br/>' + '개봉년도 : ' + obj.items[i].pubDate + '<br/>'
              + '감독 : ' + obj.items[i].director + '<br/>'
              + '배우 : ' + obj.items[i].actor
              + '<br/>' + '<br/>';
            tempDiv.onclick = function () {
              var index = Number(this.id.substring(6));
              var tempJSON = JSON.stringify(obj.items[index]);
              chrome.storage.local.get({ filter: [] }, function (result) {
                var filterList = result.filter;
                filterList.push(tempJSON);
                chrome.storage.local.set({ filter: filterList }, function () {
                  chrome.storage.local.get('filter', function (result) {
                    console.log(result.filter)
                  });
                });
              });
            }
            var backGround = document.createElement("div");
            var backGround2 = document.createElement("div");
            backGround.className = "ui container";
            backGround2.className = "ui piled segment";
            document.body.appendChild(backGround);
            backGround.appendChild(backGround2);
            backGround2.appendChild(tempDiv);
          }
        }
      }
    }
  }
}

window.onload = onWindowLoad;
