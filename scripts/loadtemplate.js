console.log("loadtemplate.js loaded.")
var xhr = new XMLHttpRequest();
xhr.open('GET', '../blogs/template.html', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var fileContent = xhr.responseText;
        var ele = document.getElementById("loadme");
        var body = document.getElementsByTagName("body")[0];
        ele.style.display = "block";
        body.innerHTML = fileContent;
        document.getElementById("main-article").appendChild(ele);
    }
};
xhr.send();

setTimeout(function() {
    var loadappsjs = document.createElement("script");
    var loadtitles = document.createElement("script");
    loadappsjs.src = "../scripts/loadapps.js";
    loadtitles.src = "../scripts/loadtitle.js";
    document.body.appendChild(loadappsjs);
    document.body.appendChild(loadtitles);
}, 200);