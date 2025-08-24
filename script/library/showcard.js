import * as tags from '/script/library/tags.js';

export function ArticleShowCard(i) {
    var result = document.createElement("a");
    var title = document.createElement("h3");
    var description = document.createElement("p");
    var tagsbox = tags.Tagsbox(i["tags"]);
    result.classList.add("card");
    result.classList.add("articles-showcard");
    result.href = `/articles/show.html?${i["id"]}`;
    result.appendChild(title);
    result.appendChild(description);
    result.appendChild(tagsbox);
    title.innerText = i["name"];
    description.innerText = i["description"];
    return result;
}

export function ApplicationShowCard(i) {
    var result = document.createElement("a");
    var title = document.createElement("h3");
    var description = document.createElement("p");
    var tagsbox = tags.Tagsbox(i["tags"]);
    result.classList.add("card");
    result.classList.add("articles-showcard");
    result.href = `/applications/${i["id"]}/main.html`;
    result.appendChild(title);
    result.appendChild(description);
    result.appendChild(tagsbox);
    title.innerText = i["name"];
    description.innerText = i["description"];
    return result;
}