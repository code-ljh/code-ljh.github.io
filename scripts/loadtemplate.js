var prev = "..";
if (!document.URL.includes("catagory")) prev = "..";
var xhr = new XMLHttpRequest();
xhr.open('GET', `${prev}/blogs/template.html`, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var fileContent = xhr.responseText;
        var ele = document.getElementById("loadme");
        var body = document.getElementsByTagName("body")[0];
        body.innerHTML = fileContent;
        ele.className = 'stretch';
        ele.style.margin = '15px';
        document.getElementById("main-article").appendChild(ele);
    }
};
xhr.send();

setTimeout(function() {
    var idx = document.URL.indexOf("blogs/");
    var name = document.URL.slice(idx + 6, -5);

    if (!document.URL.includes("catagory")) prev = "../..";
    var srcs = [`${prev}/scripts/loadapps.js`, `${prev}/scripts/loadtitle.js`, `../blogs/scripts/${name}.js`];
    for (var src of srcs) {
        var ele = document.createElement("script");
        ele.src = src;
        document.body.appendChild(ele);
    }
}, 300);