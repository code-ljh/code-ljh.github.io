function setlength(string, length, prefix = "0") {
    string = string.toString(), prefix = prefix.toString();
    while (string.length < length) string = prefix + string;
    return string;
}

function AppClocker(cardbody) {
    var specialdates = [
        new Date(0, 10, 29, 0, 0, 0),
        new Date(0, 0, 1, 0, 0, 0),
        new Date(0, 3, 8, 0, 0, 0),
        new Date(0, 6, 1, 0, 0, 0),
        new Date(0, 8, 18, 0, 0, 0),
        new Date(0, 9, 26, 0, 0, 0),
    ];
    var specialnames = [
        "下一次 NOIP", "下一个新年", "下一个生日", "下一个暑假", "下一次 CSP 初赛", "下一次 CSP 复赛"
    ];
    var day = new Date();
    var date = new Date(0, day.getMonth(), day.getDate());
    for (var i in specialnames) {
        if (date < specialdates[i]) specialdates[i].setFullYear(day.getFullYear());
        else specialdates[i].setFullYear(day.getFullYear() + 1);
    }
    var paragraph = document.createElement("div");
    paragraph.id = "clocker-paragraph";
    paragraph.style.display = "flex";
    paragraph.style.flexDirection = "column";
    paragraph.style.margin = "2px";
    paragraph.style.alignItems = "center";
    cardbody.appendChild(paragraph);
    Refresh = function () {
        var day = new Date();
        var paragraph = document.getElementById("clocker-paragraph");
        paragraph.innerHTML = `<p style="margin: 2px;flex: 12; font-size: 16">当前时间：${setlength(day.getFullYear(), 4)}/${setlength(day.getMonth(), 2)}/${setlength(day.getDate(), 2)} ${setlength(day.getHours(), 2)}:${setlength(day.getMinutes(), 2)}:${setlength(day.getSeconds(), 2)}</p>`;
        for (var i in specialnames) {
            var d = Math.round((specialdates[i] - day) / 24 / 3600 / 1000);
            paragraph.innerHTML += `<div style="flex: 8; margin: 0px">
                <span style="font-size: 12px">距离 ${specialnames[i]} 还有 </span>
                <span style="font-size: 12px; color: rgb(${255 - d * 0.5},2,2)">${d}</span>
                <span style="font-size: 12px"> 天</span>
            </div>`;
        }
    };
    Refresh();
    setInterval(Refresh, 100);
}

function AppCalendar(cardbody, cardtitle) {
    var dayinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
    //var monthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    if (date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0 || date.getFullYear() % 400 == 0) dayinmonth[1] = 29;
    var firstday = new Date(0, date.getMonth(), 1);
    var firstdayinweek = firstday.getDay();
    var table = document.createElement("div");
    table.style.display = "flex";
    table.style.flexDirection = "column";
    table.style.margin = "0px";
    cardtitle.children[1].innerText = `日历`;
    for (var i = 1; i <= 5; i++) {
        var row = document.createElement("div");
        row.style.flex = 2;
        row.style.display = "flex";
        row.style.margin = "0px";
        table.appendChild(row);
        for (var j = 1; j <= 7; j++) {
            var item = document.createElement("div");
            item.style.flex = 1;
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.justifyContent = "center";
            var para = document.createElement("p");
            para.innerText = "";
            para.style.marginLeft = "0";
            para.style.marginRight = "0";
            para.style.marginTop = "4px";
            para.style.marginBottom = "4px";
            para.style.fontSize = "12";
            para.style.display = "flex";
            para.style.alignItems = "center";
            para.style.justifyContent = "center";
            row.appendChild(item);
            item.appendChild(para);
        }
    }
    var nowx = 1, nowy = firstdayinweek + 1;
    for (var i = 1; i <= dayinmonth[date.getMonth()]; i++) {
        table.children[nowx - 1].children[nowy - 1].children[0].innerHTML = `${i}<br>${weekday[nowy - 1]}`;
        if (i == date.getDate()) table.children[nowx - 1].children[nowy - 1].children[0].style.color = "rgb(200, 0, 0)";
        nowy += 1;
        if (nowy == 8) nowy = 1, nowx += 1;
    }
    cardbody.appendChild(table);
}

function AppSayings(cardbody, cardtitle) {
    var sayings = [
        "烛昼 · 愿你我常怀光荣与梦想。",
        "Such a destiny was not desired",
        "所谓强者 则当行不可能之事 见不可状之物 摧不可挡之敌",
        "摧锋于正锐 挽澜于极危 以心中之火燃尽诸界 此乃燃钢之魂",
        "汝当立于更高处 眺望无垠远方",
    ];
    var sxfather = document.createElement("div");
    var para = document.createElement("p");
    var button = document.createElement("div");
    para.innerText = sayings[Math.floor(Math.random() * sayings.length)];
    para.style.height = "24px";
    para.style.fontSize = "12px";
    sxfather.style.display = "flex";
    sxfather.style.alignItems = "center";
    sxfather.style.justifyContent = "center";
    sxfather.style.flexDirection = "column";
    para.style.display = "flex";
    para.style.alignItems = "center";
    para.style.justifyContent = "center";
    button.style.height = "32px";
    button.style.width = "32px";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.className = "darkover";
    button.style.border = "1px solid rgba(34, 36, 38, .15)";
    button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    button.onclick = (ele) => { para.innerText = sayings[Math.floor(Math.random() * sayings.length)]; };
    sxfather.appendChild(para);
    sxfather.appendChild(button);
    cardbody.appendChild(sxfather);
}

var applist = ["倒计时", "日历", "一言"];
var appicons = [
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9997 20.5815L16.4179 18.0113M4.9997 20.5815L7.58154 18.0113M11.9997 9.58148V12.5815L13.4416 13.9998M6.74234 3.99735C6.36727 3.62228 5.85856 3.41156 5.32812 3.41156C4.79769 3.41156 4.28898 3.62228 3.91391 3.99735C3.53884 4.37242 3.32813 4.88113 3.32812 5.41156C3.32812 5.942 3.53884 6.4507 3.91391 6.82578M20.0858 6.82413C20.4609 6.44905 20.6716 5.94035 20.6716 5.40991C20.6716 4.87948 20.4609 4.37077 20.0858 3.9957C19.7107 3.62063 19.202 3.40991 18.6716 3.40991C18.1411 3.40991 17.6324 3.62063 17.2574 3.9957M18.9997 12.5815C18.9997 16.4475 15.8657 19.5815 11.9997 19.5815C8.1337 19.5815 4.9997 16.4475 4.9997 12.5815C4.9997 8.71549 8.1337 5.58149 11.9997 5.58149C15.8657 5.58149 18.9997 8.71549 18.9997 12.5815Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 21H19.5M6 21L12 3L18 21M4.5 21H8M15 14H9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
];
var appfunction = [
    AppClocker, AppCalendar, AppSayings
];
var parent = document.getElementById("body-right");

for (var i in applist) {
    var subcard = document.createElement("div");
    subcard.className = "card";
    var cardbody = document.createElement("div");
    cardbody.className = "card-body";
    var cardtitle = document.createElement("div");
    cardtitle.className = "card-title";
    cardtitle.style.cursor = "pointer";
    cardtitle.onclick = (ele) => {
        if (ele.srcElement.parentNode.children[1].style.display == "none") {
            ele.srcElement.parentNode.children[1].style.display = "block";
        } else ele.srcElement.parentNode.children[1].style.display = "none"
    };
    var cardtitletext = document.createElement("b");
    cardtitletext.style.marginLeft = "5px";
    cardtitletext.innerText = applist[i];
    cardtitle.innerHTML = appicons[i];
    subcard.appendChild(cardtitle);
    subcard.appendChild(cardbody);
    cardtitle.appendChild(cardtitletext);
    parent.appendChild(subcard);
    appfunction[i](cardbody, cardtitle);
}