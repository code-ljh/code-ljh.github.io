console.log("loadarticle.js loaded.");
//Datas
var articles;
var url = "../data/articles.json";
if (!document.URL.includes("catagory")) url = "data/articles.json";
fetch(url)
    .then(response => response.json())
    .then(data => {
        articles = data;
        setTimeout(CreateCards(), 200);
    });

var page = 0;
var mainid = (document.URL.includes("catagory") ? "main-article" : "article-list");

var cata = "";
if (document.URL.includes("catagory")) {
    var i = document.URL.indexOf("catagory") + 9;
    cata = document.URL.slice(i, -5);
}

function CreateCards() {
    var main = document.getElementById(mainid);
    for (var idx = 0; idx < articles.length; idx++) {
        if (idx >= articles.length) break;
        if (articles[idx].catagory != cata && document.URL.includes("catagory")) continue;
        console.log(idx);
        var link = document.createElement("a");
        var create = document.createElement("div");
        var titlebar = document.createElement("h1");
        var description = document.createElement("p");
        var under = document.createElement("div");
        var undertxt = document.createElement("p");
        var catagory = document.createElement("div");
        var spitbar = document.createElement("hr");
        link.href = (document.URL.includes("catagory") ? `../blogs/${articles[idx].url}.html` : `blogs/${articles[idx].url}.html`)
        create.className = "card"
        create.style.margin = "5px";
        titlebar.innerHTML = articles[idx].name;
        description.innerHTML = articles[idx].description;
        under.appendChild(undertxt);
        under.appendChild(catagory);
        cataurl = (document.URL.includes("catagory") ? `${articles[idx].catagory}.html` : `catagory/${articles[idx].catagory}.html`);
        catagory.innerHTML = `<a href="${cataurl}"><p>${articles[idx].catagory}</p></a>`;
        catagory.className = "card-catagory aligntext";
        catagory.style.background = "cornflowerblue";
        undertxt.innerHTML = "under";
        under.style.display = "flex";
        under.style.flexDirection = "row";
        under.style.width = "100%";
        under.style.alignItems = "center";
        under.style.justifyContent = "center";
        undertxt.style.flex = "0 0 auto";
        create.appendChild(titlebar);
        create.appendChild(under);
        create.appendChild(spitbar);
        create.appendChild(description);
        link.appendChild(create);
        main.appendChild(link);
    }
}