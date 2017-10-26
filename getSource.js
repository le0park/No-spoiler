var xhr = new XMLHttpRequest();
var query = '범죄도시';
var clientId = 'z3PC0R7c9QUP9GqOXffK';
var clientSecret = 'DKRegT6p7Z';
var resp;
xhr.open("GET", 'https://openapi.naver.com/v1/search/movie.json' + '?query=' + query, true);
xhr.setRequestHeader("X-Naver-Client-Id", clientId);
xhr.setRequestHeader("X-Naver-Client-Secret", clientSecret);
xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && this.status == 200){
        resp = this.response;
        if (resp !== undefined){
            chrome.extension.sendMessage({
                action: "getSource",
                source: resp
            });
        }
    }
}


// function get_source(document_body){
//     return document_body.innerText;
// }
