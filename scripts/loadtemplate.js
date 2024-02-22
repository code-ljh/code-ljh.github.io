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