console.log("loadapps.js loaded.");

function Timer(card) {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "0000/00/00 00:00:00.00";
    setInterval(function() {
        var date = new Date();
        var year = ("000" + date.getFullYear()).slice(-4);
        var month = ("000" + (date.getMonth() + 1)).slice(-2);
        var day = ("000" + (date.getDay())).slice(-2);
        var hours = ("00" + date.getHours()).slice(-2);
        var minutes = ("00" + date.getMinutes()).slice(-2);
        var seconds = ("00" + date.getSeconds()).slice(-2);
        var miliseconds = (date.getMilliseconds() + "000").slice(0, 3);
        paragraph.innerHTML = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${miliseconds}`;
    }, 20);
    card.appendChild(paragraph);
}

function ProblemSetHelper(card) {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = `一共 ${problems.length} 道题目。`;
}

//Datas
var applications = [
    {
        "name": "Timer",
        "func": Timer,
        "type": "all"
    },
    {
        "name": "Problem Set Helper",
        "func": ProblemSetHelper,
        "type": "problemsets"
    }
]

var maincard = document.getElementById("main-apps");
for (var i = 0; i < applications.length; i++) {
    if (applications[i].type === "all" || document.URL.includes(applications[i].type)) {
        var card = document.createElement("div");
        var titlebar = document.createElement("h2");
        var spitbar = document.createElement("hr");
        spitbar.style.color = "rgb(89, 89, 89)";
        card.className = "card"
        card.style.margin = "5px";
        titlebar.innerHTML = applications[i].name;
        card.appendChild(titlebar);
        card.appendChild(spitbar);
        applications[i].func(card);
        maincard.appendChild(card);
    }
}