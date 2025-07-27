function addarticle(i) {
    var parent = document.getElementById("main");
    var articlecard = document.createElement("a");
    parent.appendChild(articlecard);
    articlecard.classList.add("card");
    articlecard.style.margin = "15px";
    articlecard.style.display = "flex";
    articlecard.style.justifyContent = "center";
    articlecard.style.flexDirection = "column";
    var titlebar = document.createElement("h3");
    titlebar.style.color = "black";
    titlebar.innerText = i["name"];
    titlebar.style.margin = "2px";
    titlebar.style.textAlign = "center";
    var descrbar = document.createElement("p");
    descrbar.innerText = i["description"];
    descrbar.style.borderTop = "2px solid #00000022";
    descrbar.style.paddingTop = "20px";
    descrbar.style.margin = "2px";
    var catebar = document.createElement("p");
    catebar.style.color = "#00000055";
    catebar.innerText = `Posted under ${i["categories"].join("/")}`;
    catebar.style.margin = "2px";
    var tagsbar = document.createElement("div");
    tagsbar.style.display = "flex";
    tagsbar.style.flexDirection = "row";
    for (var j of i["tags"]) {
        var tag = document.createElement("a");
        tag.classList.add("card");
        tag.classList.add("centered");
        tag.classList.add("up");
        tag.style.padding = "10px";
        tag.style.width = "128px";
        tag.innerHTML = `<p style="margin:0;padding:0;">${j}</p>`;
        tag.href = `/tags.html?${j}`;
        tag.style.backgroundColor = "#00000005";
        tagsbar.appendChild(tag);
    }
    articlecard.appendChild(titlebar);
    articlecard.appendChild(descrbar);
    articlecard.appendChild(catebar);
    articlecard.appendChild(tagsbar);
    articlecard.classList.add("up");
    articlecard.style.backgroundColor = "#00000005";
    articlecard.href = `/articles/${i["id"]}.html`;
}

function loadarticles(data) {
    if (articlesname == "__list__") {
        var parent = document.getElementById("main");
        parent.style.flexDirection = "column";
        for (var i of data)
            addarticle(i);
    } else {
        var found;
        for (var i of data)
            if (i["id"] == articlesname) {
                found = i;
                break;
            }
        document.title = `${found["name"]} | code-ljh 的小站`;
        var main = document.getElementById("main");
        var maincard = document.createElement("div");
        maincard.classList.add("card");
        main.style.flexDirection = "column";

        main.appendChild(maincard);
        maincard.innerText = "内容加载中......";

        fetch(`/src/articles/${found["id"]}.md`)
            .then(response => response.text())
            .then(txt => {
                setTimeout(
                    () => {
                        maincard.innerHTML = marked.parse(txt);
                        renderMathInElement(
                            maincard, {
                            throwOnError: false,
                            delimiters: [
                                { left: '$$', right: '$$', display: true },
                                { left: '$', right: '$', display: false }
                            ]
                        }
                        );
                        hljs.highlightAll();
                    }, 400
                );
            });
    }
}

function loadtags(data)
{
    taglist = {};
    for (var i of data)
        for (var j of i["tags"])
            if (taglist[j] == undefined) taglist[j] = 1;
            else taglist[j] += 1;

    if (tagname == "__list__") {
        setTimeout(
            () => {
                var parent = document.getElementById("main");
                var articlecard = document.createElement("div");
                parent.appendChild(articlecard);
                parent.style.flexDirection = "column";
                articlecard.classList.add("card");
                articlecard.classList.add("centered");
                articlecard.style.margin = "15px";
                articlecard.style.backgroundColor = "#00000005";
                articlecard.innerHTML = "<h2>An overall list of all tags</h2>";
                articlecard.children[0].style.margin = "-5px";
                articlecard.children[0].style.border = "0px";
                var tagsbar = document.createElement("div");
                var tagsbarleft = document.createElement("div");
                var tagsbarmiddle = document.createElement("div");
                var tagsbarright = document.createElement("div");
                tagsbarleft.style.display = "flex";
                tagsbarleft.style.flexDirection = "column";
                tagsbarleft.style.padding = "15px";
                tagsbarright.style.display = "flex";
                tagsbarright.style.flexDirection = "column";
                tagsbarright.style.padding = "15px";
                tagsbarright.style.paddingLeft = "0";
                tagsbarmiddle.style.display = "flex";
                tagsbarmiddle.style.flexDirection = "column";
                tagsbarmiddle.style.padding = "15px";
                tagsbarmiddle.style.paddingLeft = "0";
                tagsbar.style.display = "flex";
                tagsbar.style.flexDirection = "row";
                tagsbarleft.style.flex = "1";
                tagsbarright.style.flex = "1";
                tagsbarmiddle.style.flex = "1";

                var index = 0;
                for (var i in taglist) {
                    var tag = document.createElement("a");
                    tag.classList.add("card");
                    tag.classList.add("centered");
                    tag.classList.add("up");
                    tag.style.padding = "10px";
                    tag.innerHTML = `<p style="margin:0;padding:0;">
                        ${i} || (${taglist[i]})
                    </p>`;
                    tag.href = `/tags.html?${i}`;
                    if (index % 3 == 0) tagsbarleft.appendChild(tag);
                    else if (index % 3 == 2) tagsbarright.appendChild(tag);
                    else tagsbarmiddle.appendChild(tag);
                    index += 1;
                }

                tagsbar.appendChild(tagsbarleft);
                tagsbar.appendChild(tagsbarmiddle);
                tagsbar.appendChild(tagsbarright);
                parent.appendChild(tagsbar);
            }, 400
        );
    } else {
        for (var i of data) {
            if (i["tags"].includes(tagname)) {
                addarticle(i);
            }
        }

        var elements = document.querySelectorAll("a");
        for (var i of elements)
            if (i.innerText == tagname) {
                i.style.backgroundColor = "#00000000";
            }
    }
}

function loadtemplate(template) {
    const listid = ["tab-home", "tab-articles", "tab-tags", "tab-categories"];

    const katexcss = "/library/katex.css";
    const katexjs = "/library/katex.js";
    const markedjs = "/library/marked.js";
    const highlightjs = "/library/highlight.js";
    const highlightcss = "/library/highlight.css";

    var kjs = document.createElement("script");
    kjs.src = katexjs;
    document.head.appendChild(kjs);

    var kcs = document.createElement("link");
    kcs.rel = "stylesheet";
    kcs.href = katexcss;
    document.head.appendChild(kcs);

    var hcs = document.createElement("link");
    hcs.rel = "stylesheet";
    hcs.href = highlightcss;
    document.head.appendChild(hcs);

    var mjs = document.createElement("script");
    mjs.src = markedjs;
    document.head.appendChild(mjs);

    var hj = document.createElement("script");
    hj.src = highlightjs;
    document.head.appendChild(hj);

    document.body.innerHTML += template;

    const parser = new DOMParser();
    const doc = parser.parseFromString(template, 'text/html');

    doc.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
    });

    for (var i of listid)
        if (i === `tab-${tabname}`)
            document.getElementById(i).classList.add("disgreyed");
        else
            document.getElementById(i).classList.add("greyed");

    fetch('/src/articles.json')
        .then(response => response.json())
        .then(data => {
            if (tabname == "articles")
                loadarticles(data)
            if (tabname == "tags")
                loadtags(data);
        }
        );
}

(function main() {
    fetch(`/src/template/${templatename}.html`)
        .then(response => response.text())
        .then(data => loadtemplate(data));
})();