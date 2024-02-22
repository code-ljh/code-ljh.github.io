//Datas
var articles = [
    {
        "name"       : "2048 online",
        "url"        : "2048-online",
        "description": "Let you play 2048 online."
    },
    {
        "name"       : "Article test",
        "url"        : "test",
        "description": "Article test 1.0.0"
    }
]

var articleperpage = 4;
var page = 0;
var main = document.getElementById("article-list");

for (var idx = page * articleperpage; idx < (page + 1) * articleperpage; idx++) {
    if (idx >= articles.length) break;
    var link = document.createElement("a");
    var create = document.createElement("div");
    link.href = `blogs/${articles[idx].url}.html`
    create.className = "card"
    create.style.margin = "5px";
    var titlebar = document.createElement("h1");
    titlebar.innerHTML = articles[idx].name;
    var description = document.createElement("p");
    description.innerHTML = articles[idx].description;
    var spitbar = document.createElement("hr");
    create.appendChild(titlebar);
    create.appendChild(spitbar);
    create.appendChild(description);
    link.appendChild(create);
    main.appendChild(link);
}