var query;

function onWindowLoad() {
  document.getElementById("search").addEventListener("click", search_movie);
}

function search_movie(){
  query = document.getElementById('query').value;
  chrome.tabs.executeScript(null, {
    file: "getSource.js"
    }, function() {
      if (chrome.extension.lastError) {
          document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
      }
  });
};

window.onload = onWindowLoad;
