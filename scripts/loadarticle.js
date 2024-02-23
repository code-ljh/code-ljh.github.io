console.log("loadarticle.js loaded.");
//Datas
var articles;
fetch("../data/articles.json")
    .then(response => response.json())
    .then(data => {
        articles = data;
        CreateCards();
    });

var articleperpage = 4;
var page = 0;
var main = document.getElementById("article-list");

function CreateCards() {
    for (var idx = page * articleperpage; idx < (page + 1) * articleperpage; idx++) {
        if (idx >= articles.length) break;
        var link = document.createElement("a");
        var create = document.createElement("div");
        var titlebar = document.createElement("h1");
        var description = document.createElement("p");
        var under = document.createElement("div");
        var undertxt = document.createElement("p");
        var catagory = document.createElement("div");
        var spitbar = document.createElement("hr");
        link.href = `${articles[idx].url}.html`
        create.className = "card"
        create.style.margin = "5px";
        titlebar.innerHTML = articles[idx].name;
        description.innerHTML = articles[idx].description;
        under.appendChild(undertxt);
        under.appendChild(catagory);
        catagory.innerHTML = `<a href="catagory/${articles[idx].catagory}"><p>${articles[idx].catagory}</p></a>`;
        catagory.className = "card-catagory";
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