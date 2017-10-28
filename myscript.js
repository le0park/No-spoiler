var blockArticles =[]; 
var _list;
var _list_length;
var regex_Kr = "/[^\uAC00-\uD7AF]+/g";
window.addEventListener("load", myMain, false);
function myMain(event){
    var jsInitChecktimer = setInterval(checkForNewsfeed_Finish, 7000);
}

function newsfeedFilter(){
    var _property = "display";
    var _value = "none";
    for (var i=0; i<_list_length; i++){
        if(equalStringInElement(_list[i], "대나무숲")){
            _list[i].style.display = "none";
            console.log(_list[i] + " is hidden. ");
        }
    }
}

function checkForNewsfeed_Finish(){
    if( _list = document.querySelectorAll("div.fbUserStory")){
        // console.log("Is fbUserStory exist? " + 1);
        // console.log("Length : " +  _list.length);
        if(_list_length != _list.length){
            _list_length = _list.length;
            newsfeedFilter();
            return true;
        } else {
            return false;
        }
    }
}

function equalStringInElement(element, string){
    // 요소 내의 p 태그 안에 특정 string이 있는 지 판단하는 함수.
    var pLists = element.getElementsByTagName("p"); // 요소 내 p 태그 리스트 
    if(pLists.length != 0){ // p 태그가 존재할 때
        for (var i=0; i<pLists.length; i++){
            var targetStr = pLists[i].innerText.split(/[^\uAC00-\uD7AFa-zA-Z]+/g); // p 내의 string들을 공백 문자를 기준으로 list 저장
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