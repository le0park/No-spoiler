var blockArticles =[]; 
var _list;
var _list_length;
var strings = [];
var regex_Kr = "/[^\uAC00-\uD7AF]+/g";

var hidden_pic = document.createElement("IMG");
hidden_pic.setAttribute("src", chrome.extension.getURL('img/no-spoiler-700px.png'))
hidden_pic.setAttribute("alt", "영화 스포일러 내용이 있을 수 있습니다!");
hidden_pic.style.maxHeight = '100%';
hidden_pic.style.maxWidth = '100%';
hidden_pic.onclick = function(){
    hidden_pic.previousElementSibling.style.display = 'block';
    hidden_pic.style.display = 'none';
}

chrome.storage.local.get('filter', function (result) {
    var list = result.filter;
    var s_title = [];
    var s_actor = [];
    var s_director = [];
    if(list != undefined){
        for (var i=0; i<list.length; i++){
            var parseObj = JSON.parse(list[i]);
            var tempTitle = strip_tag(parseObj.title);
            s_title = tempTitle.split(/[^\uAC00-\uD7AFa-zA-Z0-9]+/g);
            s_actor = parseObj.actor.split(/[^\uAC00-\uD7AFa-zA-Z0-9]+/g);
            s_director = parseObj.director.split(/[^\uAC00-\uD7AFa-zA-Z0-9]+/g);
            strings = strings.concat(s_title, s_actor, s_director);  
            strings = strings.filter(Boolean);
        }
    }
});
  
window.addEventListener("load", myMain, false);

function myMain(event){
    // When load is finished,
    var jsInitChecktimer = setInterval(checkForNewsfeed_Finish, 2000);
}
function checkForNewsfeed_Finish(){
    // check that newsfeed is reloaded
    // if reloaded, do filtering
    if( _list = document.querySelectorAll("div.userContentWrapper")){
        // div.userContentWrapper 선택
        if(_list_length != _list.length){   // 뉴스피드 갱신되었을 때
            _list_length = _list.length;
            for (var i=0; i<strings.length; i++){
                newsfeedFilter(strings[i]); // 필터링
            }
            return true;
        } else {
            return false;
        }
    }
}
function newsfeedFilter(string){
    // if string that may be filtered is discovered,
    // the div element is hidden.
    var _property = "display";
    for (var i=0; i<_list_length; i++){
        if(equalStringInElement(_list[i], string)){
            _list[i].style.display = "none";
            console.log(_list[i] + " is hidden. < string: " + string + " >" );
            _list[i].parentElement.appendChild(hidden_pic);
        }
    }
}
function equalStringInElement(element, string){
    // 요소 내의 p 태그 안에 특정 string이 있는 지 판단하는 함수.
    var pLists = element.getElementsByTagName("p"); // 요소 내 p 태그 리스트 
    if(pLists.length != 0){ // p 태그가 존재할 때
        for (var i=0; i<pLists.length; i++){
            var targetStr = pLists[i].innerText.split(/[^\uAC00-\uD7AFa-zA-Z0-9]+/g); // p 내의 string들을 공백 문자를 기준으로 list 저장
            for (var j=0; j<targetStr.length; j++){
                if(targetStr[j].includes(string)){ // 한 string에 포함 되는지 반복문으로 판별
                    return true;
                }
                else continue;
            }
        }
    }
    else {
        return false;
    }
    return false;
}
function strip_tag(str){
    return str.replace(/(<([^>]+)>)/ig,"");
}