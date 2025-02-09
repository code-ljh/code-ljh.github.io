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
            main.style.overflowY = "auto";
            main.style.height = "90vh";
            fetch(`/articles/${real}.md`)
                .then((response) => {return response.text();})
                .then((text) => {
                    main.innerHTML = marked.parse(text).replaceAll("\t", "    ");
                    other.innerHTML = `<p>${datathis}</p><hr>`;
                    
                    var titles = [];
                    for (var i of main.children) 
                        if (i.tagName[0] == "H") {
                            var para = i.innerText;
                            for (var j = 0; j < parseInt(i.tagName[1]); j++) para = '-' + para;
                            other.innerHTML += `<p>${para}</p>`;
                        }

                    setTimeout(() => {
                        renderMathInElement(main, {
                            delimiters: [
                                {left: "$$", right: "$$", display: true},
                                {left: "$", right: "$", display: false}
                            ],
                            throwOnError: false
                        })
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