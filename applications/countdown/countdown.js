function mainfunc() {
    var main = document.getElementById("main");
    var miin = document.getElementById("miin");
    main.style.height = "100vh";
    main.innerHTML = `
        <div class="centered" style="position:absolute;left:0;right:0;top:0;bottom:0;flex-direction:column">
            <textarea class="modern-textarea" id="h2" style="height: 64px; width: 256px; padding: 0px; padding-left: 75px; padding-right: 75px; text-align:center; font-size: 50px">01:00:00</textarea>
            <div style="display:flex;flex-direction:row;">
                <button id="btn1" class="modern-button" style="margin:15px">hrs</button>
                <button id="btn2" class="modern-button" style="margin:15px">min</button>
                <button id="btn3" class="modern-button" style="margin:15px">sec</button>
                <div id="btn4" class="modern-button tooltip-container" style="margin:15px">start
                <span id="tooltip-txt" class="tooltip-text">开始倒计时</span></div>
            </div>
        </div>
    `;
    miin.style.justifyContent = "stretch";
    // miin.style.alignItems = "stretch";
    var state = "normal";

    function hours(x) {
        x = (x % 24 + 24) % 24;
        if (x < 10) return `0${x}`;
        return `${x}`;
    }

    function minutes(x) {
        x = (x % 60 + 60) % 60;
        if (x < 10) return `0${x}`;
        return `${x}`;
    }

    const alarmsound = document.getElementById('alarm-sound');
    var kkk = 0;
    setInterval(
        () => {
            if (state == "count") {
                var x = document.getElementById("h2");
                var d = new Date();
                var cur = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
                var diff = kkk - cur;
                x.value = `${hours(Math.floor(diff / 3600))}:${minutes(Math.floor((diff / 60)) % 60)}:${minutes(diff % 60)}`;
                if (diff <= 0) {
                    state = "normal";
                    document.getElementById("btn4")
                        .classList.remove("modern-button-active");
                    document.getElementById("tooltip-txt").innerText = "开始倒计时";
                    console.log(alarmsound);
                    alarmsound.play();
                }
            } miin.innerHTML = `
                <p>当前时间
                ${hours(new Date().getHours())}:${minutes(new Date().getMinutes())}:${minutes(new Date().getSeconds())}</p>
            `;           
        }, 1000
    );

    document.getElementById("btn1").onclick = (ev) => {
        if (state == "normal") {
            ass = (ev.ctrlKey ? -1 : 1);
            var x = document.getElementById("h2");
            var lis = x.value.split(':');
            if (lis.length != 3) lis = [0, 0, 0]
            lis = [parseInt(lis[0]), parseInt(lis[1]), parseInt(lis[2])];
            x.value = `${hours(lis[0] + ass)}:${minutes(lis[1])}:${minutes(lis[2])}`;
        }
    };

    document.getElementById("btn2").onclick = (ev) => {
        if (state == "normal") {
            ass = (ev.ctrlKey ? -1 : 1);
            var x = document.getElementById("h2");
            var lis = x.value.split(':');
            if (lis.length != 3) lis = [0, 0, 0];
            lis = [parseInt(lis[0]), parseInt(lis[1]), parseInt(lis[2])];
            x.value = `${hours(lis[0])}:${minutes(lis[1] + ass)}:${minutes(lis[2])}`;
        }
    };

    document.getElementById("btn3").onclick = (ev) => {
        if (state == "normal") {
            ass = (ev.ctrlKey ? -1 : 1);
            var x = document.getElementById("h2");
            var lis = x.value.split(':');
            if (lis.length != 3) lis = [0, 0, 0];
            lis = [parseInt(lis[0]), parseInt(lis[1]), parseInt(lis[2])];
            x.value = `${hours(lis[0])}:${minutes(lis[1])}:${minutes(lis[2] + ass)}`;
        }
    };

    document.getElementById("btn4").onclick = (ev) => {
        if (state == "normal") {
            state = "count";
            document.getElementById("btn4").classList.add("modern-button-active");
            var x = document.getElementById("h2");
            var lis = x.value.split(':');
            if (lis.length != 3) lis = [0, 0, 0];
            lis = [parseInt(lis[0]), parseInt(lis[1]), parseInt(lis[2])];
            var lss = [(new Date().getHours()), (new Date().getMinutes()), (new Date().getSeconds())];
            console.log(lss[0], lss[1], lss[2]);
            console.log(lis[0], lis[1], lis[2]);
            var date = (
                lss[0] * 60 * 60 + lss[1] * 60 + lss[2] + 
                lis[0] * 60 * 60 + lis[1] * 60 + lis[2]
            );
            kkk = date;
            date = [Math.floor(date / (60 * 60)), Math.floor(date / 60) % 60, (date % 60)];
            document.getElementById("tooltip-txt").innerText = 
                `${hours(date[0])}:${minutes(date[1])}:${minutes(date[2])}`;
            console.log(document.getElementById("tooltip-txt").innerText); 
        } else {
            state = "normal";
            document.getElementById("btn4").classList.remove("modern-button-active");
            document.getElementById("tooltip-txt").innerText = "开始倒计时";
        }
    };
}

setTimeout(mainfunc, 1000);