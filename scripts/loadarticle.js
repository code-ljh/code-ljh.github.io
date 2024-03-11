var articles;
var url = "../data/articles.json";
if (!document.URL.includes("category")) url = "data/articles.json";
fetch(url)
    .then(response => response.json())
    .then(data => {
        articles = data;
        setInterval(CreateCards(), 1000);
    });

var page = 0;
var mainid = "main-article";

var cate = "";
if (document.URL.includes("category")) {
    var i = document.URL.indexOf("category") + 9;
    cate = document.URL.slice(i, -5);
}

var checked = false;

function CreateCards() {
    function Create(idx) {
        var link = document.createElement("a");
        var create = document.createElement("div");
        var titlebar = document.createElement("h1");
        var description = document.createElement("p");
        var cat2 = document.createElement("a");


        if (idx < articles.length) {
            var name = articles[idx].name;
            var url = articles[idx].url;
            var descr = articles[idx].description;
            var cate = articles[idx].category;
        } else {
            var name = '114514';
            var url = '114514';
            var descr = '1919810';
            var cate = '1919';
        }

        create.className = "card"
        create.style.margin = "5px";
        create.style.display = "flex";
        create.style.flex = "1";

        var cateurl = (document.URL.includes("category") ? `${cate}.html` : `category/${cate}.html`);
        var asseturl = (document.URL.includes("category") ? `../assets/${cate}.svg` : `assets/${cate}.svg`);

        cat2.href = cateurl;
        cat2.className = 'aligntext';
        if (idx < articles.length)
            cat2.innerHTML = `<img src="${asseturl}" height="64" width="64">`;
        link.href = (document.URL.includes("category") ? `../blogs/${url}.html` : `blogs/${url}.html`);
        link.style.flex = "4";
        cat2.style.flex = "1";

        titlebar.innerHTML = name;
        titlebar.style.margin = '5px';
        description.innerHTML = descr;

        link.appendChild(titlebar);
        link.appendChild(document.createElement("hr"));
        link.appendChild(description);

        create.appendChild(cat2);
        create.appendChild(link);

        if (idx >= articles.length) create.style.visibility = 'hidden';

        return create;
    }

    var main = document.getElementById(mainid);
    if (main && !checked) {
        main.style.display = 'flex';
        main.style.flexDirection = 'column';
        checked = true;
        var art = [];
        for (var idx of articles) {
            if ((idx.category == cate || !document.URL.includes("category")) && idx.shown || cate == 'all') {
                art.push(idx);
            }
        }
        articles = art;
        for (var idx = 0; idx < 8; idx += 2) {
            var subdiv = document.createElement("div");
            subdiv.style.display = "flex";
            subdiv.style.width = "100%";
            subdiv.appendChild(Create(idx));
            subdiv.appendChild(Create(idx + 1));
            subdiv.style.flex = '1';
            subdiv.style.alignItems = 'stretch';
            
            main.appendChild(subdiv);
        }
    }
}