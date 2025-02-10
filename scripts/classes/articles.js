import {marked} from '/scripts/libaries/marked.js'
import { GetSettings } from '/scripts/classes/settings.js';

export function initArticle(real) {
    var data, datathis;
    fetch("/assets/articles.json")
        .then((response) => {return response.json();})
        .then((json) => {
            data = json;
            datathis = json[real]; 
            var main = document.getElementById("main-left");
            var other = document.getElementById("main-right");
            fetch(`/articles/${real}.md`)
                .then((response) => {return response.text();})
                .then((text) => {
                    var txt = (text).replaceAll("\t", "    ");
                    console.log(main);
                    other.innerHTML = `<p>${datathis}</p><hr>`;

                    function Markatex(str) {
                        document.body.innerHTML += `<textarea id="ta" style="display:none;">${str}</textarea>`;
                        renderMathInElement(document.getElementById("ta"), {
                            delimiters: [
                                {left: "$$", right: "$$", display: true},
                                {left: "$", right: "$", display: false}
                            ],
                            throwOnError: false
                        });
                        var txt = document.getElementById("ta").innerHTML;
                        document.getElementById("ta").remove();
                        return marked.parse(txt.replaceAll("&gt;", ">").replaceAll("&lt;", "<"));
                    } 

                    setTimeout(() => {
                        document.getElementById("main-left").innerHTML = Markatex(txt);
                        document.getElementById("main").appendChild(main);
                        console.log(main);
                        document.getElementById("main-left").remove();
                    
                        var titles = [];
                        var md = `${datathis}\n\n---\n\n`;
                        for (var i of main.children) 
                            if (i.tagName[0] == "H") {
                                var para = i.innerHTML;
                                for (var j = 0; j < parseInt(i.tagName[1]); j++) para = '\\>$\ $' + para;
                                md += `${para}\n\n`;
                            }

                        console.log(md);
                        
                        other.innerHTML = Markatex(md);
                        document.getElementById("main").appendChild(other);
                        document.getElementById("main-right").remove();
                    }, 200);
                }) 
        });
}

export function initArticleList() {
    var data;
    fetch("/assets/articles.json")
        .then((response) => {return response.json()})
        .then((json) => {
            data = json;
            var main = document.getElementById("main-left");
            var other = document.getElementById("main-right");
            other.innerHTML = `<p>${data['articles'].length} articles found.</p><hr>`;

            for (var i of data['articles']) {
                var element = document.createElement("div");
                element.className = "article-box canchosen boxshadow";
                element.id = i;
                element.innerHTML = `<p style="font-size:16px" class="linking">${data[i]}</p>`;
                element.onclick = (event) => {
                    var tar = event.target;
                    if (event.target.tagName == "P") tar = event.target.parentNode;
                    if (GetSettings("link-behavior") == 'resettab')
                        window.location.href = `/web.html?articles.${tar.id}`;
                    else
                        window.open(`/web.html?articles.${tar.id}`);
                };
                var currentover = undefined;
                addEventListener('mouseover', (event) => {
                    var tar = event.target;
                    if (event.target.tagName == "P") tar = event.target.parentNode;
                    if (data['articles'].includes(tar.id)) {
                        tar.style.transform = "";
                    }
                });
                main.appendChild(element);
            }
        })
}

export function initApplication(real) {
    var data;
    fetch('/assets/articles.json')
        .then((response) => {return response.json();})
        .then((json) => {
            data = json;
            var script = document.createElement("script");
            script.src = `/applications/${real}.js`;
            script.type = "module";
            document.head.appendChild(script);
        });
}

export function initApplicationList() {
    var data;
    fetch("/assets/articles.json")
        .then((response) => {return response.json()})
        .then((json) => {
            data = json;
            var main = document.getElementById("main-left");
            var other = document.getElementById("main-right");
            other.innerHTML = `<p>${data['applications'].length} apps found.</p><hr>`;

            for (var i of data['applications']) {
                var element = document.createElement("div");
                element.className = "article-box canchosen boxshadow";
                element.id = i;
                element.innerHTML = `<p style="font-size:16px" class="linking">${data[i]}</p>`;
                element.onclick = (event) => {
                    var tar = event.target;
                    if (event.target.tagName == "P") tar = event.target.parentNode;
                    if (GetSettings("link-behavior") == 'resettab')
                        window.location.href = `/web.html?applications.${tar.id}`;
                    else
                        window.open(`/web.html?applications.${tar.id}`);
                };
                var currentover = undefined;
                addEventListener('mouseover', (event) => {
                    var tar = event.target;
                    if (event.target.tagName == "P") tar = event.target.parentNode;
                    if (data['applications'].includes(tar.id)) {
                        tar.style.transform = "";
                    }
                });
                main.appendChild(element);
            }
        })
}