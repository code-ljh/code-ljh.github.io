console.log("loadproblemset.js", "loaded.");

function changeinterface(event) {
    console.log("Changing interface of", event.target);
    var tar = event.target;
    var raw = tar.src;
    var idx = raw.indexOf("interface") + 9;
    tar.src = raw.slice(0, idx) + (parseInt(raw[idx]) % 2 + 1).toString() + raw.slice(idx + 1);
    localStorage.setItem(tar.id, (parseInt(raw[idx]) % 2 + 1));
}

function CreateProblems() {
    const difficulties = ["入门", "普及-", "普及/提高-", "普及+/提高", "提高+/省选-", "省选/NOI-", "NOI/NOI+/CTSC"];
    const color = ["rgb(254, 76, 97)", "rgb(243, 156, 17)", "rgb(255, 193, 22)", "rgb(82, 196, 26)", "rgb(52, 152, 219)", "rgb(157, 61, 207)", "rgb(14, 29, 105)"];
    const main = document.getElementById("main-problemset");
    main.innerHTML = `        <div style="display: flex;">
    <div class="" style="flex: 1; ">
        <p>状态</p>
    </div>
    <div class="" style="flex: 3; ">
        <p>题号</p>
    </div>
    <div class="" style="flex: 10;">
        <p>名字</p>
    </div>
    <div class="" style="flex: 3; ">
        <p>难度</p>
    </div>
</div>`;

    problems.sort((a, b) => {
        if (a[2] != b[2]) {
            return a[2] - b[2];
        } else {
            if (a[0] > b[0])
                return 1;
            if (a[0] < b[0])
                return -1;
            return 0;
        }
    });

    for (let idx = 0; idx < problems.length; idx++) {
        const problem = problems[idx];

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.className = "problem-container";

        const subcontain1 = document.createElement("div");
        const subcontain2 = document.createElement("div");
        const subcontain3 = document.createElement("div");
        const subcontain4 = document.createElement("div");

        subcontain1.className = "aligntext";
        subcontain1.style.flex = "1";
        subcontain2.style.flex = "3";
        subcontain3.style.flex = "10";
        subcontain4.style.flex = "3";

        if (localStorage.getItem(`img${problem[0]}`) == null) localStorage.setItem(`img${problem[0]}`, 1);

        subcontain1.innerHTML = `<img src="../assets/interface${localStorage.getItem("img" + problem[0])}.svg" onclick="changeinterface(event)" id="img${problem[0]}">`;
        subcontain2.innerHTML = `<p>${problem[0]}</p>`;
        subcontain3.innerHTML = `<a href="https://www.luogu.com.cn/problem/${problem[0]}"><p>${problem[1]}</p></a>`;
        subcontain4.innerHTML = `<div style="display: inline-block"><div class="card-catagory" style="background-color: ${color[problem[2]]};"><p>${difficulties[problem[2]]}</p></div>`;

        container.appendChild(subcontain1);
        container.appendChild(subcontain2);
        container.appendChild(subcontain3);
        container.appendChild(subcontain4);
        main.appendChild(document.createElement("hr"));
        main.appendChild(container);
    }
}

CreateProblems();