function addshowcard(i, type="article") {
    var parent = document.getElementById("main");
    var articlecard = document.createElement("a");
    parent.appendChild(articlecard);
    if (type == "article")
        articlecard.classList.add("card");
    if (type == "application")
        articlecard.classList.add("card-app");
    articlecard.style.margin = "15px";
    articlecard.style.marginTop = "7px";
    articlecard.style.display = "flex";
    articlecard.style.justifyContent = "center";
    articlecard.style.flex = "1";
    articlecard.style.flexDirection = "column";
    var titlebar = document.createElement("h3");
    titlebar.style.color = "black";
    titlebar.innerText = i["name"];
    if (type == "article")
        titlebar.innerText = `${i["time"][0]}/${i["time"][1]}/${i["time"][2]} ${i["name"]}`;
    titlebar.style.margin = "2px";
    titlebar.style.textAlign = "center";
    var descrbar = document.createElement("p");
    descrbar.innerText = i["description"];
    descrbar.style.borderTop = "2px solid #00000022";
    descrbar.style.paddingTop = "20px";
    descrbar.style.margin = "2px";
    var catebar = document.createElement("div");
    catebar.innerHTML = `<a style="color:#00000055;margin: 0px;" 
        href="${'/categories.html?' + (i['categories'].join('.'))}">
        ${i["categories"].join("/")}
        </p>`;
    catebar.style.margin = "0px";
    catebar.style.padding = "0px";
    catebar.style.justifySelf = "left";
    catebar.style.textAlign = "right";
    var tagsbar = document.createElement("div");
    tagsbar.style.display = "flex";
    tagsbar.style.flexDirection = "row";
    var ttt = document.createElement("a");
        ttt.classList.add("card");
        ttt.classList.add("centered");
        ttt.classList.add("up");
        ttt.style.padding = "5px";
        ttt.style.borderRadius = "10px";
    var p = document.createElement("p");
    p.style.fontSize = "12px";
    p.style.margin = "0";
    p.style.padding = "0";
    p.innerText = ":>>>";
    ttt.appendChild(p);
    ttt.style.backgroundColor = "#00ff0007";
    ttt.href = (type == "article" ? 
        `/articles/show.html?${i["id"]}` : 
        `/applications/${i["id"]}/main.html`);
    tagsbar.appendChild(ttt);
    for (var j of i["tags"]) {
        var tag = document.createElement("a");
        tag.classList.add("card");
        tag.classList.add("centered");
        tag.classList.add("up");
        tag.style.padding = "5px";
        tag.style.borderRadius = "10px";
        tag.innerHTML = `<img src="/asset/tag.svg" style="margin:2px" width="15" height="15">`;
        var p = document.createElement("p");
        p.style.fontSize = "12px";
        p.style.margin = "0";
        p.style.padding = "0";
        p.innerText = j;
        tag.appendChild(p);
        tag.href = `/tags.html?${j}`;
        tag.style.backgroundColor = "#ffffff00";
        tagsbar.appendChild(tag);
    }
    articlecard.appendChild(titlebar);
    articlecard.appendChild(descrbar);
    articlecard.appendChild(catebar);
    articlecard.appendChild(tagsbar);
    articlecard.style.transition = "background-color 0.3s";
    articlecard.href = (type == "article" ? 
        `/articles/show.html?${i["id"]}` : 
        `/applications/${i["id"]}/main.html`);
}

function loadapplications(data) {
    if (applicationsname == "__list__") {
        var parent = document.getElementById("main");
        parent.style.flexDirection = "column";
        for (var i of data)
            addshowcard(i, "application");        
    }
}

function loadarticles(data) {
    if (articlesname == "__list__") {
        var parent = document.getElementById("main");
        parent.style.flexDirection = "column";
        for (var i of data)
            addshowcard(i);
    } else {
        var found;
        for (var i of data)
            if (i["id"] == articlesname) {
                found = i;
                break;
            }
        document.title = `${found["name"]} | code-ljh 的小站`;
        
        var main = document.getElementById("main");
        var miin = document.getElementById("miin");
        var maincard = document.createElement("div");
        maincard.classList.add("card");
        main.style.flexDirection = "column";

        main.appendChild(maincard);
        maincard.innerText = "内容加载中......";

        miin.style.justifyContent = "stretch";
        miin.style.alignItems = "stretch";
        miin.innerHTML += `<b style="margin:15px;margin-bottom:0px">文章描述</b><p style="margin:15px;color:#000000cc">${found["description"]}</p>`;

        function Size(x) {
            if (x < 1000) return `${x}B`;
            if (x <= 1000000) return `${Math.round(x / 1000)}KB`;
            if (x <= 1000000000) return `${Math.round(x / 1000000)}MB`;
        }

        fetch(`/src/articles/${found["id"]}.md`)
            .then(response => response.text())
            .then(txt => {
                setTimeout(
                    () => {
                        miin.innerHTML += `<p style="margin:15px">本文大小 ${(txt.length)} 字节。</p>`;
                        maincard.innerHTML = marked.parse(txt);
                        maincard.style.margin = "15px";
                        maincard.style.padding = "21px";
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

                        var parent = document.getElementById("main");
                        var articlecard = document.createElement("div");
                        parent.style.flexDirection = "column";
                        articlecard.style.margin = "15px";
                        // articlecard.style.backgroundColor = "#00000005";

                        articlecard.style.display = "flex";
                        articlecard.style.padding = "0px";

                        x = "";
                        var tag = document.createElement("a");
                        tag.classList.add("card");
                        tag.classList.add("centered");
                        tag.classList.add("up");
                        tag.classList.add("modern-button");
                        tag.style.padding = "10px";
                        tag.innerHTML = `<p style="margin:0;padding:0; color:#ffffff; width: 128px; text-align:center">Return</p>`;
                        tag.href = `/categories.html?${found["categories"].join(".")}`;
                        articlecard.appendChild(tag);
                        tag = document.createElement("div");
                        tag.id = "copy-button";
                        tag.classList.add("card");
                        tag.classList.add("centered");
                        tag.classList.add("up");
                        tag.classList.add("modern-button");
                        tag.style.padding = "10px";
                        tag.innerHTML = `<p style="margin:0;padding:0; color:#ffffff; width: 128px; text-align:center">Copy</p>`;
                        tag.onclick = () => {
                            navigator.clipboard.writeText(txt);
                            var cb = document.getElementById("copy-button");
                            cb.children[0].innerText = "Copied";
                            cb.classList.add("modern-button-active");
                            setTimeout(() => {
                                var cb = document.getElementById("copy-button");
                                cb.children[0].innerText = "Copy";
                                cb.classList.remove("modern-button-active");
                            }, 1000);
                        };
                        articlecard.appendChild(tag);
                        parent.appendChild(articlecard);

                        var lis = document.getElementsByClassName("language-cpp");
                        var index = 0;
                        var eee = [];
                        while (lis.length) {
                            var ele = lis[0];
                            var par = ele.parentNode;
                            var inner = par.children[0].innerHTML;
                            var newpar = document.createElement("div");
                            par.replaceWith(newpar);
                            newpar.innerHTML = `
                                <div style="background-color:#00000002;padding:12px;border:2px solid #eeeeee;display:flex;flex-direction:column">
                                    <b style="font-size:30px;margin:0px; padding:5px;display:flex;border-bottom:2px solid #00000010"> 
                                    <img class="copy-button-img up" src="/asset/copy.svg" width="30" height="30" style="border:2px solid #eee;padding:2px;margin:2px">
                                    <p style="margin:2px">Code C++ (Folded)</p> </b>
                                </div>
                            `;
                            newpar.children[0].id = index;
                            index += 1;
                            eee.push(`<pre style="border:2px solid #00000010; margin:5px; padding:15px; overflow:auto"><code>${inner}</code></pre>`);
                            newpar.onclick = (evt)=>{
                                var tar = evt.srcElement;
                                if (tar.tagName === "P") tar = tar.parentNode;
                                if (tar.tagName === "B") tar = tar.parentNode;
                                if (tar.tagName === "IMG") {
                                    var e = tar.parentNode.parentNode;
                                    e = e.children[1].children[0];
                                    navigator.clipboard.writeText(e.innerText);
                                    tar.src = "/asset/tick.svg";
                                    setTimeout(() => {
                                        tar.src = "/asset/copy.svg";
                                    }, 500);
                                } else {
                                    if (tar.children.length == 1)
                                    tar.innerHTML += eee[tar.id],
                                    tar.children[0].children[1].innerText = "Code C++";
                                    else tar.removeChild(tar.children[1]),
                                    tar.children[0].children[1].innerText = "Code C++ (Folded)";
                                }
                                
                            };
                        }                        
                    }, 400
                );
            });
    }
}

function loadtags(data, dtat) {
    taglist = {};
    for (var i of data)
        for (var j of i["tags"])
            if (taglist[j] == undefined) taglist[j] = 1;
            else taglist[j] += 1;

    for (var i of dtat)
        for (var j of i["tags"])
            if (taglist[j] == undefined) taglist[j] = 1;
            else taglist[j] += 1;

    if (tagname == "__list__") {
        setTimeout(
            () => {
                var parent = document.getElementById("main");
                var articlecard = document.createElement("div");
                parent.style.flexDirection = "column";
                articlecard.classList.add("card");
                articlecard.classList.add("centered");
                articlecard.style.margin = "15px";
                articlecard.style.backgroundColor = "#00000005";
                articlecard.innerHTML = "<h2>An overall list of all tags</h2>";
                articlecard.children[0].style.margin = "-5px";
                articlecard.children[0].style.border = "0px";
                var tagsbars = [
                    document.createElement("div"),
                    document.createElement("div"),
                    document.createElement("div"),
                    document.createElement("div")
                ];
                var tagsbar = document.createElement("div");

                for (var i of tagsbars) {
                    i.style.display = "flex";
                    i.style.flexDirection = "column";
                    i.style.padding = "7.5px";
                    i.style.flex = "1";
                    tagsbar.appendChild(i);
                }

                tagsbar.style.display = "flex";
                tagsbar.style.flexDirection = "row";

                var index = 0;
                function tagbox(txt1, txt2, href, type=false) {
                    var ttt = document.createElement("a");
                    ttt.classList.add(type?"card-active":"card");
                    ttt.classList.add("centered");
                    ttt.classList.add("hover-box");
                    ttt.classList.add("up");
                    ttt.classList.add("tooltip-container");
                    laston = undefined;
                    ttt.style.padding = "10px";
                    ttt.innerHTML = `
                        <img src="/asset/tag.svg" style="margin:2px;position:absolute" width="15" height="15">
                        <p style="margin:0;padding:0;text-align:center;font-size:14px">
                            ${txt1}
                        </p>
                    `;
                    ttt.innerHTML += `
                        <div class="centered tooltip-text" style="color:#555555;background-color:#00000020;display:flex;position:absolute;transform:translate(0,100%)">
                            <img src="/asset/article.svg" style="margin:2px" width="15" height="15">
                            <p style="color:#555555;text-align:center;margin: 2.5px;margin-left: 8px; margin-right:8px;font-size:12px">
                                ${txt2}
                            </p>
                        </div>
                    `;
                    ttt.href = href;
                    tagsbars[index % 4].appendChild(ttt);
                    index += 1;
                }

                tagbox("articles", data.length, "/articles.html", true);
                tagbox("apps", dtat.length, "/applications.html", true);

                for (var i of Object.keys(taglist).sort()) 
                    tagbox(i, taglist[i], "/tags.html?" + i);

                parent.appendChild(tagsbar);
            }, 400
        );
    } else {
        for (var i of data) {
            if (i["tags"].includes(tagname)) {
                addshowcard(i);
            }
        }
        for (var i of dtat) {
            if (i["tags"].includes(tagname)) {
                addshowcard(i, "application");
            }
        }

        document.title = `标签 ${tagname} | code-ljh 的小站`;
        var elements = document.querySelectorAll("a");
        for (var i of elements)
            if (i.innerText == tagname) {
                i.classList.remove("card");
                i.classList.add("card-tag-marked");
            }
    }
}

function loadcategories(data, dtat) {
    data = data.concat(dtat);
    var parent = document.getElementById("main");
    var articlecard = document.createElement("div");
    parent.style.flexDirection = "column";
    articlecard.style.margin = "15px";
    // articlecard.style.backgroundColor = "#00000005";

    articlecard.style.display = "flex";
    articlecard.style.padding = "0px";

    x = "";
    var tag = document.createElement("a");
    tag.classList.add("card");
    tag.classList.add("centered");
    tag.style.padding = "10px";
    tag.innerHTML = `<p style="margin:0;padding:0;">root://</p>`;
    tag.href = `/categories.html`;
    articlecard.appendChild(tag);
    for (var i of catename) {
        x += i;
        var tag = document.createElement("a");
        tag.classList.add("card");
        tag.classList.add("centered");
        tag.classList.add("up");
        tag.style.padding = "10px";
        tag.innerHTML = `<p style="margin:0;padding:0;">${i}/</p>`;
        tag.href = `/categories.html?${x.split("/").join(".")}`;
        articlecard.appendChild(tag);
        x += "/";
    }

    parent.appendChild(articlecard);
            
    var main = document.getElementById("main");
    main.innerHTML += `
        <table id="myTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
        </table>
    `;

    function foldersize(fold) {
        catename.pop();
        var prefix = catename.concat(fold);
        var displays = [];
        for (var i of data) {
            if (i["categories"].length < prefix.length) continue;
            var flag = true;
            for (var j in prefix)
                if (prefix[j] !== i["categories"][j])
                    flag = false;
            if (flag)
                displays.push(i["categories"][prefix.length]);
        } return displays.length;
    } 

    var displays = [];
    var articles = [];
    for (var i of data) {
        if (i["categories"].join(" ") === catename.join(" ")) {
            articles.push(i);
            continue;
        }
        if (i["categories"].length <= catename.length) continue;
        var flag = true;
        for (var j in catename)
            if (catename[j] !== i["categories"][j])
                flag = false;
        if (flag)
            displays.push(i["categories"][catename.length]);
    }

    displays = [... new Set(displays)];

    var k = document.getElementById("table-body");

    for (var i of displays) {
        catename.push(i);
        k.innerHTML += `
            <tr>
                <th> 
                    <p>
                        <img src="/asset/categories.svg" style="margin:-1px" width="15" height="15">
                        <a class="green-a" href="/categories.html?${(catename).join(".")}">
                            ${"/" + catename.join("/") + "/"}
                        </a>
                    </p> 
                </th>

                <th> <p>${i}</p> </th>
                <th> <p>folder</p> </th>
                <th> <p> ${foldersize(i)} </p> </th>
            </tr>
        `; 
    }

    for (var i of articles) {
        if (i["categories"][0] === "apps") {
            catename.push(i["id"]);
            k.innerHTML += `
                <tr class="red">
                    <th> 
                        <p>
                            <img src="/asset/applications.svg" style="margin:-1px" width="15" height="15">
                            <a class="red" href="/applications/${i["id"]}/main.html">
                                ${i["id"] + ".app"}
                            </a>
                        </p> 
                    </th>
                    <th> <p> ${i["name"]} </p> </th>
                    <th> <p> application </p> </th>
                    <th> <p> ${1} </p> </th>
                </tr>
            `;
        } else {
            catename.push(i["id"]);
            k.innerHTML += `
                <tr class="blue">
                    <th> 
                        <p>
                            <img src="/asset/article.svg" style="margin:-1px" width="15" height="15">
                            <a class="blue" href="/articles/show.html?${i["id"]}">
                                ${i["id"] + ".arc"}
                            </a>
                        </p> 
                    </th>
                    <th> <p> ${i["name"]} </p> </th>
                    <th> <p> article </p> </th>
                    <th> <p> ${1} </p> </th>
                </tr>
            `;
        }
    }
}

function loadtemplate(template) {
    const listid = [
        "tab-home", 
        "tab-articles",
        "tab-tags", 
        "tab-categories",
        "tab-applications"
    ];

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

    fetch('/src/applications.json')
        .then(response => response.json())
        .then(data => {
            if (tabname == "applications")
                loadapplications(data);
        });

    fetch('/src/articles.json')
        .then(response => response.json())
        .then(data => {
            try {
                articlesname;
                loadarticles(data);
            } catch {
                fetch("/src/applications.json")
                    .then(response => response.json())
                    .then(dtat => {
                        if (tabname == "categories")
                            loadcategories(data, dtat);
                        if (tabname == "tags")
                            loadtags(data, dtat);
                    });
            }            
        }
        );
}

(function main() {
    fetch(`/src/template/${templatename}.html`)
        .then(response => response.text())
        .then(data => loadtemplate(data));
})();