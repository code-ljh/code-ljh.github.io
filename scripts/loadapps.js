function Introduction(card) {
    var paragraph = document.createElement("p");
    paragraph.id = "p114514";
    paragraph.innerHTML = articleintro;
    card.appendChild(paragraph);
}

function UpdateIntroduction() {
    var paragraph = document.getElementById("p114514");
    paragraph.innerHTML = articleintro;
}

function ProblemSetHelper(card) {
    var paragraph = document.createElement("p");
    var canvas = document.createElement("canvas");
    canvas.id = "main-canvas";
    canvas.width = "20vw";
    canvas.height = "50vh";
    const main = document.getElementById("main-problemset").childNodes;
    paragraph.innerHTML = `0 Total<br>0 Accepted`;
    setInterval(function() {
        var full = 0;
        var correct = 0;
        for (var element of main) {
            if (element.className === "problem-container") {
                var subcontain = element.childNodes[0];
                var id = subcontain.childNodes[0].id;
                var problemid = id.slice(3);
                if (localStorage.getItem(id) == 2) correct += 1;
                full += 1;
            }
        }
        paragraph.innerHTML = `${full} Total<br>${correct} Accepted`;
    }, 200);
    var array = [0, 0, 0, 0, 0, 0, 0];
    var max = 0;
    for (var problem of problems) 
        array[problem[2]] += 1;
    for (var arr of array)
        if (arr > max)
            max = arr;
    const ctx = canvas.getContext('2d');
    const labels = ["红题", "橙题", "黄题", "绿题", "蓝题", "紫题", "黑题"];
    const data = {
        labels: labels,
        datasets: [{
            label: '题目数量',
            data: array,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(32, 32, 32, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    max: max,
                    min: 0
                }
            }
        }
    };
    const vc = new Chart(ctx, config);
    card.appendChild(paragraph);
    card.appendChild(document.createElement("hr"));
    card.appendChild(canvas);
}

function CatagoryList(card) {
    var catas;
    fetch('data/catagories.json')
        .then(response => response.json())
        .then(data => {
            catas = data;
            setInterval(CreateApp(card), 200);
        });

    function CreateApp(card) {
        var div = document.createElement("div");
        for (var cata of catas) {
            var name = cata.name;
            var intro = cata.intro;
            var description = cata.description;
            var subdiv = document.createElement("div");
            subdiv.style.display = "flex";
            subdiv.innerHTML = `
                <a href="/catagory/${name}.html">
                    <div style="display: inline-block; flex: 1">
                        <p> 
                            ${intro}
                        </p>
                    </div>

                    <div style="display: inline-block; flex: 1">
                        <p> 
                            ${description}
                        </p>
                    </div>
                </a>
            `;
            div.appendChild(subdiv);
        }
        card.appendChild(div);
    }
}

function ArticleList(card) {
    var datas;
    fetch('../data/articles.json')
        .then(response => response.json())
        .then(data => {
            datas = data;
            setInterval(CreateApp(card), 200);
        });
    added = false;

    function CreateApp(card) {
        var div = document.createElement("div");
        for (var data of datas) {
            if (data.catagory == cata) {
                var subdiv = document.createElement("div");
                subdiv.style.display = "flex";
                subdiv.innerHTML = `
                    <a href="/catagory/${data.url}.html">
                        <div style="display: inline-block; flex: 1">
                            <p> 
                                ${data.name}
                            </p>
                        </div>
                    </a>
                `;
                div.appendChild(subdiv);
            }
        }
        card.appendChild(div);
    }
}

//Datas
var applications = [
    {
        "name": "题单信息",
        "func": ProblemSetHelper,
        "type": "problemsets"
    },
    {
        "name": "简介",
        "func": Introduction,
        "type": "intro"
    },
    {
        "name": "分类列表",
        "func": CatagoryList,
        "type": "index"
    },
    {
        "name": "博客列表",
        "func": ArticleList,
        "type": "catagories"
    }
]

function GetArticleType() {
    try {
        return articletype;
    } catch (ReferenceError) {
        return "114514";
    }
}

setTimeout(() => {
    var maincard = document.getElementById("main-apps");
    for (var i = 0; i < applications.length; i++) {
        if (applications[i].type === "all" || GetArticleType().includes(applications[i].type)) {
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
}, 200);