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
            <button class="modern-button" id="distribute">
                Share
            </button>
        `;

        var dis = document.getElementById("distribute");
        dis.onclick = () => {
            var left = document.getElementById("leftpart");
            var right = document.getElementById("rightpart");
            var base64 = encodeBase64(left.value);
            location.href = "/applications/editor/main.html?" + base64;
        };

        var k = location.href.indexOf("?");
        k = location.href.slice(k + 1, location.href.length);
        try {
            k = decodeBase64(k);
        } catch {
            k = "";
        }

        main.innerHTML = `
            <div style="position:absolute;left:0;right:50%;top:0;bottom:0;">
                <textarea id="leftpart" class="modern-textarea" style="width:32.5vw;height:90vh">${k}</textarea>
            </div>
            <div style="position:absolute;left:47.5%;right:0;top:0;bottom:0;">
                <div id="rightpart" style="width:40vw;height:90vh; padding: 2px; margin: 0; overflow:auto">
                
                </div>
            </div>
        `;

        setInterval(
            () => {
                var left = document.getElementById("leftpart");
                var right = document.getElementById("rightpart");
                right.innerHTML = marked.parse(left.value);
                right.style.fontSize = "10px";
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
            }, 1000
        );
    }, 1000
);