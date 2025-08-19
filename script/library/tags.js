function Tag(name) {
    var tag = document.createElement("a");
    tag.classList.add("card");
    tag.classList.add("centered");
    tag.classList.add("up");
    tag.style.padding = "5px";
    tag.style.borderRadius = "10px";
    tag.innerHTML = `<img src="/asset/images-svg/tag.svg" style="margin:2px" width="15" height="15">`;
    var p = document.createElement("p");
    p.style.fontSize = "12px";
    p.style.margin = "0";
    p.style.padding = "0";
    p.innerText = name;
    tag.appendChild(p);
    tag.href = `/tags.html?${name}`;
    tag.style.backgroundColor = "#ffffff00";
    return tag;
}