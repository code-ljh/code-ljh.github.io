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
        dis.onclick = (evt) => {
            var i = document.getElementById("left");
            var j = document.getElementById("right");
            if (i.style.display == "flex") {
                i.style.display = "none";
                j.style.flexBasis = "100%";
            } else {
                i.style.display = "flex";
                j.style.flexBasis = "60%";
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
        main.style.width = "100%";
        document.body.style.overflow = "hidden";
        main.innerHTML = `
            <div id="left" style="display: flex; justify-content:space-around; flex-shrink:0; flex-basis:40%;">
                <textarea id="leftpart" class="modern-textarea" style="padding:10px;flex:1;font-size:8.5px;overflow:auto">${k}</textarea>
            </div>
            <div id="right" style="display: flex; justify-content:space-around; flex-shrink:0; flex-basis:60%;overflow:auto">
                <div id="rightpart" style="overflow:auto; font-size: 8.5px; border:2px solid #03020230;padding:10px;flex:1;overflow-x:hidden">
                
                </div>
            </div>
        `;
        main.style.display = "flex";
        main.style.flexDirection = "row";
        main.style.justifyContent = "space-around";

        var ori = document.getElementById("leftpart").value;
        Text(ori, document.getElementById("rightpart"));
        setInterval(
            () => {
                var left = document.getElementById("leftpart");
                var right = document.getElementById("rightpart");
                if (left.value !== ori) {
                    Text(left.value, right);
                    ori = left.value;
                }
            }, 500
        );
    }, 1000
);