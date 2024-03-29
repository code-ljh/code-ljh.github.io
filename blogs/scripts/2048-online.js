const COLUMN = 4;
var blank = [];
for (var i = 0; i < COLUMN; i++) {
    var tmp = [];
    for (var j = 0; j < COLUMN; j++)
        tmp.push(0);
    blank.push(tmp);
}
const BLANK = JSON.stringify(blank);
var score = 0;
var data = JSON.parse(BLANK);
var scores = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608];
var datcolor = ['#333333', 'rgb(157,139,1)', 'rgb(52,152,219)', 'red', 'rgb(142,68,173)', '#000099', '#000099', '#000099', 'rgb(192, 150, 0)', 'rgb(0, 16, 141)', 'rgb(6, 157, 1)', 'rgb(141, 0, 136)', '#555555', '#444444', '#333333', '#222222', '#222222', '#222222', '#222222', '#222222', '#222222'];
var dattext = ['', 'CE', '<div class="loader"></div>', 'WA', 'RE', 'TLE', 'MLE', 'OLE', 'PC', 'UKE', 'AC', 'AK', '+1', '+2', '+3', '+4', 'x5', 'x6', 'x7', 'x8', 'x9'];
var ani = [];
var overallani = 100, step = 2;
const MAX = 20;
const SPAWNS = 1;
const INITS = (rand) => (rand > 0.8 ? 2 : 1);
const ENABLE_SPAWNS = true;

function ForceAnimationStop() {
    ani = [];
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j <= 4; j++) {
            var ele = document.getElementById(`m${i}${j}`).children[0];
            ele.style.width = "100%";
            ele.style.height = "100%";
            ele.style.filter = "";
        }
}

setInterval(() => {
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j <= 4; j++) {
            var ele = document.getElementById(`m${i}${j}`);
            if (ele && data[i - 1][j - 1] > 15) {
                ele.style.filter = `brightness(${overallani}%)`;
            } else if (ele) ele.style.filter = "";
        }

    overallani += step;
    if (overallani > 600) overallani -= 2, step = -20;
    if (overallani < 100) overallani += 2, step = +20;
}, 20);

function AddAnimation(x, y, z) {
    var elem = document.getElementById(`m${x}${y}`).children[0];
    if (z == 0) {
        elem.style.width = `10%`;
        elem.style.height = `10%`;
    } else {
        elem.style.width = `120%`;
        elem.style.height = `120%`;
    }
    ani.push([`m${x}${y}`, z]);
}

setInterval(function MainLoopAnimation() {
    for (var a of ani) {
        var elem = document.getElementById(a[0]).children[0];
        var size = parseInt(elem.style.width.slice(0, -1));
        var type = a[1];
        if (type == 0 && size < 100) {
            elem.style.width = `${size + 5}%`;
            elem.style.height = `${size + 5}%`;
        }
        if (type == 1 && size > 100) {
            elem.style.width = `${size - 2}%`;
            elem.style.height = `${size - 2}%`;
        }
    }
}, 20);

function OnRestart() {
    checked = false;
    lost = false;
    document.getElementById('dialog').style.display = "none";
    data = JSON.parse(BLANK);
    score = 0;
    SetData();
    MainLoopScore();
    for (var i = 0; i < 2 * SPAWNS; i++)
        CreateBlock();
}

function OnConfirm() {
    var dialog = document.getElementById("rd-checker");
    dialog.style.display = "none";
    var inputbox = document.getElementById("inputboxchecker");
    console.log(inputbox, inputbox.value);
    if (inputbox.value === "确认重置") {
        OnRestart();
        localStorage.setItem("maxscore", score);
        MainLoopScore();
    }
    lost = false;
}

function OnClose() {
    var dialog = document.getElementById("rd-checker");
    dialog.style.display = "none";
    lost = false;
}

function OnRestartData() {
    var dialog = document.getElementById("rd-checker");
    dialog.style.display = "block";
    lost = true;
}

function MainLoopScore() {
    if (localStorage.getItem("maxscore") == null)
        localStorage.setItem("maxscore", score);
    else if (score > localStorage.getItem("maxscore"))
        localStorage.setItem("maxscore", score);
    articleintro = `在线玩 2048 小游戏。<br>
    规则：通过 wasd 移动方块，相等的方块会被合成成下一级方块。<br>
    <div style="display: flex; left: 1vw; right: 1vw">
        <div class="card-category flex-item" style="flex: 1; height: 64px; background-color: #555555; display: flex; flex-direction: column; align-items: center">
            <h2 style="color: white; text-align: center; margin: 0">分数</h2>
            <p>${score}</p>
        </div>
        <div class="card-category flex-item" style="flex: 1; height: 64px; background-color: #555555; display: flex; flex-direction: column; align-items: center">
            <h2 style="color: white; text-align: center; margin: 0">历史</h2>
            <p>${localStorage.getItem("maxscore")}</p> 
        </div>
    </div>
    <div style="display: flex; left: 1vw; right: 1vw">
        <div class="card-category flex-item aligntext" style="flex: 1; height: 32px; background-color: blue" onclick="OnRestart()">
            <p style="color: white">重开</p>    
        </div>
    </div>
    <div style="display: flex; left: 1vw; right: 1vw">
        <div class="card-category flex-item aligntext" style="flex: 1; height: 32px; background-color: red" onclick="OnRestartData()">
            <p style="color: white">重置数据</p>    
        </div>
    </div>`;
    try {
        UpdateIntroduction();
    } catch (ReferenceError) {}
}
MainLoopScore();

function Create2048() {
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j <= 4; j++) {
            var ele = document.getElementById(`m${i}${j}`);
            ele.style.width = "8vw";
            ele.style.height = "8vw";
            ele.style.margin = "5px";
            ele.style.backgroundColor = datcolor[0];
            ele.style.borderRadius = '5px';
            ele.className = "aligntext";
            ele.innerHTML = `
                <div class="aligntext" style="border-radius: 5px; height: 100%; width: 100%;">
                    <h1 style="align-text: center; font-size: 64px" id="p${i}${j}">
                        
                    </h1>
                </div>
            `;
        }
    for (var i = 0; i < 2 * SPAWNS; i++) CreateBlock();
    SetData();
    addEventListener('keydown', (event) => {ChangeBlocks(event)});
    document.getElementById('confirm').onclick = OnConfirm;
    document.getElementById('close')  .onclick = OnClose;
    document.getElementById('restart').onclick = OnRestart;
}

var checked = false;
var lost = false;
function CheckFlags() {
    var winflag = 0;
    var losflag = 0;
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (data[i][j] == 0) {
                losflag = 1;
            } else if (data[i][j] == 11) {
                winflag = 1;
            }
        }
    var mainframe = document.getElementById("dialog");
    if (winflag && !checked) {
        mainframe.style.display = "block";
        checked = true;
        mainframe.children[0].innerHTML = "You win!";
        setTimeout(() => {mainframe.style.display = "none";}, 1000);
        return "win";
    } else if (!losflag) {
        var dx = [0, 0, 1, -1];
        var dy = [1, -1, 0, 0];
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                for (var k = 0; k < 4; k++) {
                    var x = i + dx[k];
                    var y = j + dy[k];
                    if ((0 <= x && x <= 3) && (0 <= y && y <= 3) && CanEliminate(data[x][y], data[i][j]))
                        losflag = 1;
                }
        if (!losflag) {
            lost = true;
            mainframe.children[0].innerHTML = "You lose";
            mainframe.style.display = "block";
            return "los";
        }
        return "semi-los";
    }
}

function CanEliminate(x, y) {
    if (x == y && x < MAX && x > 0) {
        return true;
    } else {
        return false;
    }
}

function ChangeBlocks(event) {
    if (lost) return;
    var code = event.code;
    var befdata = JSON.stringify(data);
    var poses = [];
    ForceAnimationStop();
    switch(code) {
        case 'KeyA': // move left
            for (var i = 0; i < 4; i++) { // loop through each row
                var row = data[i].filter(x => x > 0); // get the non-zero values in the row
                for (var j = 0; j < row.length - 1; j++) { // loop through the row from left to right
                    if (CanEliminate(row[j], row[j + 1])) { // if two adjacent values are equal
                        row[j]++;
                        row.splice(j + 1, 1); // remove the right value
                        poses.push([i, j]);
                        score += scores[row[j]];
                        break;
                    }
                }
                while (row.length < 4) row.push(0);
                data[i] = row; // update the data with the new row
            }
            break;
        case 'KeyS': // move down
            for (var j = 0; j < 4; j++) { // loop through each column
                var col = []; // create an empty array to store the column values
                for (var i = 0; i < 4; i++) { // loop through each row
                    col.push(data[i][j]); // push the value at the current column index to the array
                }
                col = col.filter(x => x > 0); // get the non-zero values in the column
                while (col.length < 4) col.unshift(0);
                for (var i = col.length - 1; i > 0; i--) { // loop through the column from bottom to top
                    if (CanEliminate(col[i], col[i - 1])) { // if two adjacent values are equal
                        col[i]++; // increase the bottom value by one
                        col.splice(i - 1, 1); // remove the top value
                        col.unshift(0);
                        poses.push([i, j]);
                        score += scores[col[i]];
                        break;
                    }
                }
                for (var i = 0; i < 4; i++) { // loop through each row
                    data[i][j] = col[i]; // update the data with the new column value
                }
            }
            break;
        case 'KeyD': // move right
            for (var i = 0; i < 4; i++) { // loop through each row
                var row = data[i].filter(x => x > 0); // get the non-zero values in the row
                while (row.length < 4) row.unshift(0);
                for (var j = row.length - 1; j > 0; j--) { // loop through the row from right to left
                    if (CanEliminate(row[j], row[j - 1])) { // if two adjacent values are equal
                        row[j]++; // increase the right value by one
                        row.splice(j - 1, 1); // remove the left value
                        row.unshift(0);
                        poses.push([i, j]);
                        score += scores[row[j]];
                        break;
                    }
                }
                data[i] = row; // update the data with the new row
            }
            break;
        case 'KeyW': // move up
            for (var j = 0; j < 4; j++) { // loop through each column
                var col = []; // create an empty array to store the column values
                for (var i = 0; i < 4; i++) { // loop through each row
                    col.push(data[i][j]); // push the value at the current column index to the array
                }
                col = col.filter(x => x > 0); // get the non-zero values in the column
                for (var i = 0; i < col.length - 1; i++) { // loop through the column from top to bottom
                    if (CanEliminate(col[i], col[i + 1])) { // if two adjacent values are equal
                        col[i]++; // increase the top value by one
                        col.splice(i + 1, 1); // remove the bottom value
                        poses.push([i, j]);
                        score += scores[col[i]];
                        break;
                    }
                }
                while (col.length < 4) col.push(0);
                for (var i = 0; i < 4; i++) { // loop through each row
                    data[i][j] = col[i]; // update the data with the new column value
                }
            }
            break;
    }
    SetData();
    MainLoopScore();
    if (befdata !== JSON.stringify(data))
        for (var i = 0; i < SPAWNS; i++)
            CreateBlock();
    for (var pos of poses) {
        AddAnimation(pos[0] + 1, pos[1] + 1, 1);
    }
    CheckFlags();
}

function SetData() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var ele = document.getElementById(`p${i + 1}${j + 1}`);
            ele.innerHTML = dattext[data[i][j]];
            ele.parentNode.style.backgroundColor = datcolor[data[i][j]];
        }
}

function CreateBlock() {
    var flag = false;
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (data[i][j] == 0) {
                flag = true;
                break;
            }
    if (flag && ENABLE_SPAWNS) {
        var pos = [];
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (!data[i][j])
                    pos.push([i, j]);
        var p = Math.floor(Math.random() * pos.length);
        data[pos[p][0]][pos[p][1]] = INITS(Math.random());
        AddAnimation(pos[p][0] + 1, pos[p][1] + 1, 0);
        var ele = document.getElementById(`m${pos[p][0] + 1}${pos[p][1] + 1}`).children[0];
        SetData();
    }
}

setTimeout(() => {Create2048()}, 200);