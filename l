[1mdiff --git a/manifest.json b/manifest.json[m
[1mindex b672e32..619b1c7 100644[m
[1m--- a/manifest.json[m
[1m+++ b/manifest.json[m
[36m@@ -9,7 +9,6 @@[m
             "matches" : ["https://www.facebook.com/*"],[m
             "js" : [[m
                 "myscript.js",[m
[31m-                "jquery-3.2.1.min.js"[m
             ],[m
             "run_at" : "document_end"[m
         }[m
[36m@@ -22,7 +21,6 @@[m
         "https://openapi.naver.com/*",[m
         "activeTab",[m
         "tabs", "https://www.facebook.com/*",[m
[31m-        "https://code.jquery.com/jquery-3.1.1.min.js"[m
     ],[m
     "web_accessible_resources": ["img/no-spoiler-700px.png"][m
 }[m
[1mdiff --git a/popup.html b/popup.html[m
[1mindex 68e52bd..fa7e5d0 100644[m
[1m--- a/popup.html[m
[1m+++ b/popup.html[m
[36m@@ -5,6 +5,7 @@[m
         <link rel="stylesheet" type="text/css" href="css/style.css">[m
         <link rel="stylesheet" type="text/css" href="css/semantic/semantic.css">[m
             [m
[32m+[m[32m        <script src="jquery-3.2.1.min.js"></script>[m
         <script src="css/semantic/semantic.js"></script>[m
         <script src="getSource.js"></script>[m
     </head>[m
