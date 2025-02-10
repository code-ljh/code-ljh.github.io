import {initNavigation} from '/scripts/classes/navigation.js';
import {initSettings, GetSettings} from '/scripts/classes/settings.js';
import {
    initArticle, initArticleList,
    initApplication, initApplicationList
} from '/scripts/classes/articles.js';

fetch('/assets/pages.json')
    .then((response) => {return response.json()})
    .then((json) => {
        main(json);
    });

function initFrame() {
    if (GetSettings("show-leading") == 'yes') {
        var leadbar = document.createElement("div");
        leadbar.id = "lead-bar";
        leadbar.className = "boxshadow";
        document.body.appendChild(leadbar);
    }
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
    if (GetSettings("show-leading") == 'no') main.style.top = "0px";
} 

async function main(pages) {
    document.body.spellcheck = false;
    initFrame();

    var link = window.location.href;
    if (!link.includes("?")) 
        window.location.href = link + "?nav.homepage";
    var sharp = link.indexOf("?");
    var real = link.slice(sharp + 1);
    
    if (!pages[real]) {
        var main = document.getElementById("main-left");
        main.innerHTML = `<p>Error 404 page not found</p>`;
        return;
    }
    
    document.title = pages[real]["title"];

    if (real.includes("articles."))
        initArticle(real.slice(9));

    if (real.includes("articles") && real.includes("nav."))
        initArticleList();

    if (real.includes("applications."))
        initApplication(real.slice(13));

    if (real.includes("applications") && real.includes("nav."))
        initApplicationList();

    if (real.includes("settings"))
        initSettings();

    setTimeout(() => {
        hljs.highlightAll();
        setTimeout(() => {
            var list = document.getElementsByClassName("hljs");
            for (var ele of list) {
                ele.style.background = "#000000";
                ele.style.color = "#555555";
            }
        }, 200);      
    }, 200);
}