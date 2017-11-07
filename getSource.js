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
        element.innerHTML = 
          '<div class="ui card">' +
            '<div class="content">' +
              '<i id="delete' + i +'" class="right floated disabled red minus large icon"></i>' +
              '<div class="header">' + parseObj.title + '</div>' +
              '<div class="description">' +
              '개봉년도 : ' + parseObj.pubDate + '<br/>' +
              '감독 : ' + parseObj.director + 
              '</div>' +
            '</div>' +
            '<div class="extra content">' +
              '<span class="left floated like">' +
                '<i class="like icon"></i>' +
                'Prevent by Spoiler.' +
              '</span>' +
            '</div>' + 
          '</div>';


        element.querySelector("#delete" + i).onmouseover = function(){
          element.querySelector("#delete" + i).className="right floated red minus large icon";
        };
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
            tempDiv.innerHTML = 
              '<div class="ui card">' +
                '<div class="content">' +
                  '<div class="header">' + obj.items[i].title + '</div>' +
                  '<div class="description">' +
                    '개봉년도 : ' + obj.items[i].pubDate + '<br/>' +
                    '감독 : ' + obj.items[i].director + '<br/>' +
                    '배우 : </br> ' + obj.items[i].actor +
                  '</div>' +
                '</div>' +
                '<div id="add' + i +'" class="ui bottom attached button">' +
                  '<i class="add icon"></i>' +
                  'Add spoiler' +
                '</div>' +
              '</div>';
    
          
            tempDiv.querySelector("#add" + i).onclick = function () {
              var index = Number(this.id.substring(4));
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
              location.reload();
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
