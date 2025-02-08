import {marked} from '/scripts/libaries/marked.js'

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
                    main.innerHTML = marked.parse(text).replaceAll("\t", "    ");
                    other.innerHTML = `<p>${datathis}</p><hr>`;
                    setTimeout(() => {
                        renderMathInElement(main, {
                            delimiters: [
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
            other.innerHTML = `<p>${data['list'].length} articles found.</p><hr>`;

            for (var i of data['list']) {
                var element = document.createElement("div");
                element.className = "article-box boxshadow";
                element.id = i;
                element.innerHTML = `<p>${data[i]}</p>`;
                element.onclick = (event) => {
                    var tar = event.target;
                    if (event.target.tagName == "P") tar = event.target.parentNode;
                    window.location.href = `/web.html?articles.${tar.id}`;
                };
                var currentover = undefined;
                addEventListener('mouseover', (event) => {
                    var tar = event.target;
                    if (event.target.tagName == "P") tar = event.target.parentNode;
                    if (data['list'].includes(tar.id)) {
                        console.log(tar.id);
                        tar.style.transform = "";
                    }
                });
                main.appendChild(element);
            }
        })
}

export function initTools(real) {
    var data;
    fetch('/assets/tools.json')
        .then((response) => {return response.json();})
        .then((json) => {
            data = json;
        });
}