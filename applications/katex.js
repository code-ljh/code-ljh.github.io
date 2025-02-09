import {marked} from '/scripts/libaries/marked.js'

var cardl = document.getElementById("main-left");
var cardr = document.getElementById("main-right");

cardl.style.right = "50%";
cardr.style.left = "50%"; 

cardl.innerHTML = `
    <textarea wrap="off" id="textarea" class="card" style="color:#dddddd;position:absolute;width:90%;height:90%"></textarea>
`;

cardl.style.display = "flex";
cardl.style.alignItems = "center";
cardl.style.justifyContent = "center";

cardr.style.overflow = "auto";
cardr.style.height = "80vh";

var ta = document.getElementById('textarea');
ta.value = localStorage.getItem("katex");
ta.style.overflowY = "auto";
var value = ta.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
cardr.innerHTML = marked.parse(value);
localStorage.setItem("katex", ta.value);
renderMathInElement(cardr, {
    delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
    ],
    throwOnError: false
});
ta.oninput = () => {
    var value = ta.value;
    cardr.innerHTML = marked.parse(value);
    localStorage.setItem("katex", ta.value);
    renderMathInElement(cardr, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ],
        throwOnError: false
    });
};