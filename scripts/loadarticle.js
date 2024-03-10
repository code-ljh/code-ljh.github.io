var articles;
var url = "../data/articles.json";
if (!document.URL.includes("catagory")) url = "data/articles.json";
fetch(url)
    .then(response => response.json())
    .then(data => {
        articles = data;
        setInterval(CreateCards(), 1000);
    });

var page = 0;
var mainid = (document.URL.includes("catagory") ? "main-article" : "article-list");

var cata = "";
if (document.URL.includes("catagory")) {
    var i = document.URL.indexOf("catagory") + 9;
    cata = document.URL.slice(i, -5);
}

var checked = false;

function CreateCards() {
    function Create(idx) {
        var link = document.createElement("a");
        var create = document.createElement("div");
        var titlebar = document.createElement("h1");
        var description = document.createElement("p");
        var under = document.createElement("div");
        var undertxt = document.createElement("p");
        var catagory = document.createElement("div");

        if (idx < articles.length) {
            var name = articles[idx].name;
            var url = articles[idx].url;
            var descr = articles[idx].description;
            var cata = articles[idx].catagory;
        } else {
            var name = '114514';
            var url = '114514';
            var descr = '1919810';
            var cata = '1919';
        }

        create.className = "card"
        create.style.margin = "5px";
        create.style.flex = "1";

        link.href = (document.URL.includes("catagory") ? `../blogs/${url}.html` : `blogs/${url}.html`);

        titlebar.innerHTML = name;
        titlebar.style.margin = '5px';
        description.innerHTML = descr;

        cataurl = (document.URL.includes("catagory") ? `${cata}.html` : `catagory/${cata}.html`);
        catagory.innerHTML = `<a href="${cataurl}"><p>${cata}</p></a>`;
        catagory.className = "card-catagory aligntext";
        catagory.style.background = "cornflowerblue";
        undertxt.innerHTML = "under";
        under.style.display = "flex";
        under.style.flexDirection = "row";
        under.style.width = "100%";
        under.style.alignItems = "center";
        under.style.justifyContent = "center";
        undertxt.style.flex = "0 0 auto";
        under.appendChild(undertxt);
        under.appendChild(catagory);

        link.appendChild(titlebar);
        link.appendChild(under);
        link.appendChild(document.createElement("hr"));
        link.appendChild(description);

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
            if ((idx.catagory == cata || !document.URL.includes("catagory")) && idx.shown) {
                art.push(idx);
            }
        }
        articles = art;
        for (var idx = 0; idx < 6; idx += 2) {
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