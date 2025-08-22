function Text(txt, maincard) {
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

    x = "";

    var code = document.getElementsByTagName("code");
    var lis = [];

    for (var element of code) {
        var newele = document.createElement("code");
        var flag = element.classList.contains("language-cpp");
        newele.innerHTML = element.innerHTML;
        if (flag) newele.classList.add("cplusplus");
        element.replaceWith(newele);
    }

    lis = document.getElementsByClassName("cplusplus");
    var index = 0;
    var eee = [];
    while (lis.length) {
        var ele = lis[0];
        var par = ele.parentNode;
        var inner = par.children[0].innerHTML;
        var newpar = document.createElement("div");
        par.replaceWith(newpar);
        newpar.innerHTML = `
        <div class="target-header card" style="background-color:#00000002;padding:12px;border:2px solid #eeeeee;display:flex;flex-direction:column">
            <div style="font-size:30px;margin:0px; padding:5px;display:flex;border-bottom:2px solid #00000010"> 
                <p class="card" style="margin:2px;border:2px solid #00000030;padding:2px;text-align:center;padding-left: 7px; padding-right:7px">Code C++</p>
                <img class="fold-button-img up" src="/asset/images-svg/categories.svg" width="30" height="30" style="border:2px solid #eee;padding:2px;margin:2px">
                <img class="copy-button-img up" src="/asset/images-svg/copy.svg" width="30" height="30" style="border:2px solid #eee;padding:2px;margin:2px">
                <img class="plus-button-img up" src="/asset/images-svg/plus.svg" width="30" height="30" style="border:2px solid #eee;padding:2px;margin:2px">
                <img class="minus-button-img up" src="/asset/images-svg/minus.svg" width="30" height="30" style="border:2px solid #eee;padding:2px;margin:2px"> 
            </div>
        </div>
        `;
        newpar.children[0].id = index;
        index += 1;
        eee.push(`<pre style="border:2px solid #00000010; margin:5px; padding:15px; overflow:auto"><code>${inner}</code></pre>`);
        newpar.onclick = (evt) => {
            var tar = evt.srcElement;
            if (tar.tagName === "P") tar = tar.parentNode;
            if (tar.tagName === "B") tar = tar.parentNode;
            // console.log(tar.classList);
            // console.log(tar);
            if (tar.tagName === "IMG") {
                try {
                    var e = tar.parentNode.parentNode;
                    e = e.children[1].children[0];
                } catch { }
                if (tar.classList.contains("copy-button-img")) {
                    navigator.clipboard.writeText(e.innerText);
                    tar.src = "/asset/images-svg/tick.svg";
                    setTimeout(() => {
                        tar.src = "/asset/images-svg/copy.svg";
                    }, 500);
                } else if (tar.classList.contains("plus-button-img")) {
                    e = e.parentNode;
                    var p = parseFloat(e.style.fontSize.slice(0, -2));
                    p += 1;
                    e.style.fontSize = `${p}px`;
                } else if (tar.classList.contains("minus-button-img")) {
                    e = e.parentNode;
                    var p = parseFloat(e.style.fontSize.slice(0, -2));
                    p -= 1;
                    e.style.fontSize = `${p}px`;
                } else {
                    var oritar = tar;
                    console.log(tar);
                    tar = tar.parentNode.parentNode;
                    console.log(tar);
                    if (tar.children.length == 1) {
                        tar.innerHTML += eee[tar.id],
                            tar.children[1].style.fontSize = "12.5px";
                        oritar.src = "/asset/images-svg/article.svg";
                        tar.children[0].children[1].replaceWith(oritar);
                        console.log(oritar);
                    } else {
                        tar.removeChild(tar.children[1]);
                        oritar.src = "/asset/images-svg/categories.svg";
                    }
                }
            }
        };
    }
}
