console.log("loadproblemset.js", "loaded.");

function main() {
    const difficulties = ["入门", "普及-", "普及/提高-", "普及+/提高", "提高+/省选-", "省选/NOI-", "NOI/NOI+/CTSC"];
    const color = ["rgb(254, 76, 97)", "rgb(243, 156, 17)", "rgb(255, 193, 22)", "rgb(82, 196, 26)", "rgb(52, 152, 219)", "rgb(157, 61, 207)", "rgb(14, 29, 105)"];
    const main = document.getElementById("main-problemset");

    problems = problems.sort((a, b) => a[2] - b[2]);

    for (let idx = 0; idx < problems.length; idx++) {
        const problem = problems[idx];

        const container = document.createElement("div");
        container.style.display = "flex";

        const subcontain1 = document.createElement("div");
        const subcontain2 = document.createElement("div");
        const subcontain3 = document.createElement("div");
        const subcontain4 = document.createElement("div");

        subcontain1.className = "aligntext";
        subcontain1.style.flex = "1";
        subcontain2.style.flex = "3";
        subcontain3.style.flex = "10";
        subcontain4.style.flex = "3";

        subcontain1.innerHTML = `<img src="../assets/interface1.svg">`;
        subcontain2.innerHTML = `<p>${problem[0]}</p>`;
        subcontain3.innerHTML = `<a href="https://www.luogu.com.cn/problem/${problem[0]}"><p>${problem[1]}</p></a>`;
        subcontain4.innerHTML = `<div style="display: inline-block"><div class="card-catagory" style="background-color: ${color[problem[2]]};"><p>${difficulties[problem[2]]}</p></div>`;

        container.appendChild(subcontain1);
        container.appendChild(subcontain2);
        container.appendChild(subcontain3);
        container.appendChild(subcontain4);
        main.appendChild(container);

        console.log("Added", problem[1], "to problemset.");
    }
}

main();