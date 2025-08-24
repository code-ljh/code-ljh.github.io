import * as tags from '/script/library/tags.js';
import * as text from '/script/library/text.js'; 
import * as showcard from '/script/library/showcard.js';
import * as set from '/script/library/settings.js';
import * as articles from '/script/pages/articles.js';
import * as categories from '/script/pages/categories.js';
import * as pagestags from '/script/pages/tags.js';
import * as loadscripts from '/script/template/script.js';

function loadapplications(data) {
    if (applicationsname == "__list__") {
        var parent = document.getElementById("main");
        for (var i of data) {
            parent.appendChild(
                showcard.ApplicationShowCard(i));
        }
    }
}

function loadarticles(data) {
    var parent = document.getElementById("main");
    var type = set.SettingItem("display.articleslist");
    if (articlesname == "__list__") {
        if (type === "traditional") {
            articles.AddArticleCards(data, parent);
        } else {
            articles.AddArticleTable(data, parent);
        }
    } else {
        for (var i of data) {
            if (i["id"] == articlesname) {
                articles.LoadArticlePage(i, parent);
            }
        }
    }
}

function loadcategories(data, dtat) {
    var parent = document.getElementById("main");
    categories.LoadCategories(catename, data, dtat, parent);
}

function loadtags(data, dtat) {
    var parent = document.getElementById("main");
    pagestags.LoadTags(tagname, data, dtat, parent);
}

function StartLoading(template, arts, apps) {
    console.log(arts, apps);
    loadscripts.LoadScripts();
    document.body.innerHTML += template;

    var tabhome = document.getElementById("tab-home");
    var tabarticles = document.getElementById("tab-articles");
    var tabtags = document.getElementById("tab-tags");
    var tabcategories = document.getElementById("tab-categories");
    var tabapplications = document.getElementById("tab-applications");

    switch (tabname) {
        case "home":
            tabhome.classList.add("template-navitem-chosen");
            break;
        
        case "articles":
            tabarticles.classList.add("template-navitem-chosen");
            loadarticles(arts);
            break;
        
        case "tags":
            tabtags.classList.add("template-navitem-chosen");
            loadtags(arts, apps);
            break;
        
        case "categories":
            tabcategories.classList.add("template-navitem-chosen");
            loadcategories(arts, apps);
            break;
        
        case "applications":
            tabapplications.classList.add("template-navitem-chosen");
            loadapplications(apps);
            break;
    
        default:
            console.error("Unrecognizable tabname.");
            break;
    }
}

(function main() {
    fetch(`/src/applications.json`)
        .then(response => response.json())
        .then(data => {

            fetch(`/src/articles.json`)
                .then(response => response.json())
                .then(dtat => {

                    fetch(`/src/template/${templatename}.html`)
                        .then(response => response.text())
                        .then(template => 
                            StartLoading(template, dtat, data));
                })
        });
})();