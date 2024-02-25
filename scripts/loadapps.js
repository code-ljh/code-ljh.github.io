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

async function ProblemSetHelper(card) {
    var paragraph = document.createElement("p");
    const main = document.getElementById("main-problemset").childNodes;
    paragraph.innerHTML = `0/0/0`;
    setInterval(function() {
        var full = 0;
        var wrong = 0;
        var correct = 0;
        for (var element of main) {
            if (element.className === "problem-container") {
                var subcontain = element.childNodes[0];
                var id = subcontain.childNodes[0].id;
                var problemid = id.slice(3);
                if (localStorage.getItem(id) == 2) correct += 1;
                if (localStorage.getItem(id) == 3) wrong += 1;
                full += 1;
            }
        }
        paragraph.innerHTML = `${full} Total<br>${correct} Accepted<br>${wrong} Unaccepted`;
    }, 200);
    card.appendChild(paragraph);
    card.appendChild(document.createElement("hr"));
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