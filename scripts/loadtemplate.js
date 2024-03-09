var prev = "..";
if (!document.URL.includes("catagory")) prev = "..";
var xhr = new XMLHttpRequest();
xhr.open('GET', `${prev}/blogs/template.html`, true);
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
    if (!document.URL.includes("catagory")) prev = "../..";
    var srcs = [`${prev}/scripts/loadapps.js`, `${prev}/scripts/loadtitle.js`];
    for (var src of srcs) {
        var ele = document.createElement("script");
        ele.src = src;
        document.body.appendChild(ele);
    }
}, 200);