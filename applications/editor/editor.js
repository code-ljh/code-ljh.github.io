function encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function decodeBase64(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

setTimeout(
    () => {
        var main = document.getElementById("main");
        var miin = document.getElementById("miin");
        
        main.style.display = "flex";
        main.style.flexDirection = "row";

        miin.innerHTML = `
        <div style="flex-direction:column;display: flex">
            <div class="modern-button tooltip-container" id="distribute" style="margin:15px">
                Share
                <div class="centered tooltip-text" style="color:#555555;display:flex;position:absolute;transform:translate(0,100%);bottom:50%">
                    <p style="color:#ffffff;text-align:center;margin: 2.5px;margin-left: 8px; margin-right:8px;font-size:12px;">
                        按下此按钮后复制链接以与其他人分享文档
                    </p>
                </div>
            </div>

            <div class="modern-button tooltip-container" id="display" style="margin:15px">
                Show
                <div class="centered tooltip-text" style="color:#555555;display:flex;position:absolute;transform:translate(0,100%);bottom:50%">
                    <p style="color:#ffffff;text-align:center;margin: 2.5px;margin-left: 8px; margin-right:8px;font-size:12px;">
                        进入展示模式，输入框将被隐藏
                    </p>
                </div>
            </div>

            <div class="modern-button tooltip-container" id="save" style="margin:15px">
                Save
                <div class="centered tooltip-text" style="color:#555555;display:flex;position:absolute;transform:translate(0,100%);bottom:50%">
                    <p style="color:#ffffff;text-align:center;margin: 2.5px;margin-left: 8px; margin-right:8px;font-size:12px;">
                        保存到本地缓存中，清缓存会消失。
                    </p>
                </div>
            </div>
        </div>
        `;

        var dis = document.getElementById("distribute");
        dis.onclick = () => {
            var left = document.getElementById("leftpart");
            var right = document.getElementById("rightpart");
            var base64 = encodeBase64(left.value);
            location.href = "/applications/editor/main.html?" + base64;
        };

        var sav = document.getElementById("save");
        sav.onclick = () => {
            var left = document.getElementById("leftpart");
            localStorage.setItem("katex-document", left.value);
        };
        
        dis = document.getElementById("display");
        var mode = "normal";
        dis.onclick = () => {
            var left = document.getElementById("leftpart");
            var right = document.getElementById("rightpart");

            if (mode == "normal") {
                left.opacity = "0";
                setTimeout(() => {
                    left.parentNode.style.display = "none";
                }, 0);
                mode = "display";
                right.parentNode.style.left = "5%";
                right.style.fontSize = "16px";
                right.style.width = "70vw";
            } else {
                left.opacity = "1";
                setTimeout(() => {
                    left.parentNode.style.display = "block";
                }, 0);
                mode = "normal";
                right.parentNode.style.left = "47.5%";
                right.style.fontSize = "10px";
                right.style.width = "40vw";
            }
        };

        var k = location.href.indexOf("?");
        k = location.href.slice(k + 1, location.href.length);
        try {
            k = decodeBase64(k);
        } catch {
            var d = localStorage.getItem("katex-document");
            if (d != null) {
                k = d;
            } else {
                k = "在这里写下你的 KaTeX 文档！";
            }            
        }

        main.style.height = "100vh";
        main.style.overflow = "hidden";
        main.innerHTML = `
            <div style="position:absolute;left:0;right:50%;top:0;bottom:0; transition: all 0.3s;">
                <textarea id="leftpart" class="modern-textarea" style="width:32.5vw;height:95vh;transition: all 0.3s;margin: 5px; padding: 10px">${k}</textarea>
            </div>
            <div style="position:absolute;left:45%;right:0;top:0;bottom:0; transition: all 0.3s;">
                <div id="rightpart" style="width:40vw;height:95vh; padding: 2px; margin: 0px; overflow:auto; font-size: 10px">
                
                </div>
            </div>
        `;

        setInterval(
            () => {
                var left = document.getElementById("leftpart");
                var right = document.getElementById("rightpart");
                right.innerHTML = marked.parse(left.value);
                renderMathInElement(
                    main, 
                    {
                        throwOnError: false,
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '$', right: '$', display: false }
                        ]
                    }
                );
                hljs.highlightAll();
            }, 500
        );
    }, 1000
);