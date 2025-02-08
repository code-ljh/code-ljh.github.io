import {initNavigation} from '/scripts/classes/navigation.js';
import {initArticle, initArticleList} from '/scripts/classes/articles.js';

fetch('/assets/pages.json')
    .then((response) => {return response.json()})
    .then((json) => {
        main(json);
    });

function initFrame() {
    var leadbar = document.createElement("div");
    leadbar.id = "lead-bar";
    leadbar.className = "boxshadow";
    document.body.appendChild(leadbar);
    var navbar = document.createElement("div");
    navbar.id = "nav-bar";
    navbar.className = "boxshadow";
    document.body.appendChild(navbar);
    initNavigation();
    var main = document.createElement("div");
    main.id = "main";
    document.body.appendChild(main);
    var left = document.createElement("div");
    left.id = "main-left";
    left.className = "card";
    main.appendChild(left);
    var right = document.createElement("div");
    right.id = "main-right";
    right.className = "card";
    main.appendChild(right);
} 

function main(pages) {
    var link = window.location.href;
    if (!link.includes("?")) 
        window.location.href = link + "?nav.homepage";
    var sharp = link.indexOf("?");
    var real = link.slice(sharp + 1);
    document.title = pages[real]["title"];
    initFrame();

    if (real.includes("articles."))
        initArticle(real.slice(9));

    if (real.includes("articles") && real.includes("nav."))
        initArticleList();
}