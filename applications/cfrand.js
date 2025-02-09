var href = "/assets/codeforces.json";
var allproblems = [];

fetch(href, {method: 'GET'})
    .then(response => {return response.json();})
    .then(data => {
        allproblems = data;
        document.getElementById("confirmbtn").onclick = (event) => {
            var min = parseInt(document.getElementById("inputmin").value);
            var max = parseInt(document.getElementById("inputmax").value);
            var validproblems = [];
            console.log(allproblems);
            for (var i of allproblems)
                if (min <= i['rating'] && i['rating'] <= max)
                    validproblems.push(i);
            var prob = (validproblems[Math.floor(Math.random() * validproblems.length)]);
        
            document.getElementById("main-right").innerHTML = `
            <div class="card cardchosen" id="jumpto">
                <p>Result: CF${prob["contestId"]}${prob["index"]}</p>
            </div>
            <div class="card cardchosen" id="jumplo">
                <p>Chinese Version</p>
            </div>`;
        
            document.getElementById("jumpto").onclick = () => {
                window.location.href = `https://codeforces.com/problemset/problem/${prob["contestId"]}/${prob["index"]}`;
            };
        
            document.getElementById("jumplo").onclick = () => {
                window.location.href = `https://luogu.com.cn/problem/CF${prob["contestId"]}${prob["index"]}`;
            };
        };
     });

var main = document.getElementById("main-left");
main.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center">
    <div style="display: flex; width: 100%;">
        <input id="inputmin" value="1900" class="card cardchosen" style="flex: 1; height: 32px; width: 33%; color: #dddddd; text-align:center;">
        <input id="inputmax" value="2300" class="card cardchosen" style="flex: 1; height: 32px; width: 33%; color: #dddddd; text-align:center;">
        <div id="confirmbtn" class="card cardchosen" style="flex: 1; height: 32px; width: 33%; color: #dddddd; text-align:center;"><p>Confirm</p></div>
    </div>
<div>`;

document.getElementById("main-right").innerHTML = `<p>Click 'Confirm' to Get a random codeforces problem.</p>`;