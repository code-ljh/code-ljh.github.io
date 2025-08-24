function IsPrefix(cate, prefix) {
    if (prefix.length >= cate.length) return false;
    for (var i = 0; i < prefix.length; i++)
        if (prefix[i] !== cate[i])
            return false;
    return true;
}

function IsSame(cate, pref) {
    if (cate.length != pref.length) return false;
    for (var i = 0; i < pref.length; i++)
        if (pref[i] !== cate[i])
            return false;
    return true;
}

function CateTableItem(id, name, type, link, imglink) {
    var tbl = document.createElement("tr");
    var tbn = document.createElement("th");
    var tbi = document.createElement("th");
    var tbt = document.createElement("th");
    var tblink = document.createElement("a");
    var tbimg = document.createElement("img");
    tbl.appendChild(tbi);
    tbl.appendChild(tbn);
    tbl.appendChild(tbt);
    tbl.classList.add(`categories-table-${type}`);
    tbi.appendChild(tbimg);
    tbi.appendChild(tblink);
    tbi.classList.add("categories-table-body");
    tbn.classList.add("categories-table-body");
    tbn.innerText = name;
    tbt.classList.add("categories-table-body");
    tbt.innerText = type;
    tblink.innerText = id;
    tblink.href = link;
    tbimg.src = imglink;
    tbimg.classList.add("categories-table-image");
    return tbl;
}

export function LoadCategories(cate, arts, apps, parent) {
    var list = [];
    var currentarts = [];
    var currentapps = [];
    var currentfold = new Set();
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var theadline = document.createElement("tr");
    var tid = document.createElement("th");
    var tname = document.createElement("th");
    var ttype = document.createElement("th");
    parent.appendChild(table);
    table.classList.add("modern-table");
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(theadline);
    theadline.appendChild(tid);
    theadline.appendChild(tname);
    theadline.appendChild(ttype);
    tname.innerText = "Name";
    tname.classList.add("categories-table-head");
    tid.innerText = "ID";
    tid.classList.add("categories-table-head");
    ttype.innerText = "Type";
    ttype.classList.add("categories-table-head");
    for (var i of arts) {
        if (IsSame(cate, i["categories"])) {
            currentarts.push(i);
        }
    }
    for (var i of apps) {
        if (IsSame(cate, i["categories"])) {
            currentapps.push(i);
        }
    }
    var both = arts.concat(apps);
    for (var i of both) {
        if (IsPrefix(i["categories"], cate)) {
            currentfold.add("/" + i["categories"].slice(0, cate.length + 1).join("/"));
        }
    }
    if (cate.length) {
        tbody.appendChild(CateTableItem("../", "back", 
            "folder",
            (cate.length == 1 ?
                "/categories.html" :
                `/categories.html?${cate.slice(0, cate.length = 1).join('.')}`),
            "/asset/images-svg/back.svg"
        ));
    }
    for (var i of currentfold) {
        tbody.appendChild(CateTableItem(i, 
            i.slice(i.lastIndexOf('/') + 1, i.length), "folder",
            `/categories.html?${i.split("/").slice(1).join(".")}`,
            "/asset/images-svg/categories.svg"
        ));
    }
    for (var i of currentarts) {
        tbody.appendChild(CateTableItem(i["id"], 
            i["name"], "articles",
            `/articles/show.html?${i["id"]}`,
            "/asset/images-svg/article.svg"
        ));
    }
    for (var i of currentapps) {
        tbody.appendChild(CateTableItem(i["id"], 
            i["name"], "applications",
            `/applications/${i["id"]}/main.html`,
            "/asset/images-svg/applications.svg"
        ));
    }
}