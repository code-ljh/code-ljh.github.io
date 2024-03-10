var templates;

fetch('../data/templates.json')
    .then(response => response.json())
    .then(data => {
        templates = data;
        CreateMainList();
    });

function OnClick(event) {
    var tar = event.target;
    if (tar.tagName === 'BUTTON')
        tar = tar.children[0];
    var text = (tar.id.slice(4));

    fetch(`../data/templates/${text}.cpp`)
        .then(async function (response) {
            var txt = await response.text();
            txt = txt.replace('<', '&lt;').replace('>', '&gt;');
            LoadCodes(txt);
        });
    
    function LoadCodes(codes) {
        var ele = document.getElementById('main-code');
        ele.style.overflow = 'auto';
        ele.innerHTML = `
            <pre class="code-block"><code class="language-cpp" style="font-size: 16px">${codes}
            </pre></code>
        `;
        hljs.highlightAll();
    }
}

function CreateMainList() {
    var main = document.getElementById('main-list');

    for (var idx in templates) {
        var div = document.createElement('div');
        var name = templates[idx].name;
        var desc = templates[idx].description;
        var id = templates[idx].id;
        var namebox = document.createElement('div');
        var descbox = document.createElement('div');
        var buttbox = document.createElement('div');
        var button = document.createElement('button');

        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        
        buttbox.style.flex = '2';
        namebox.style.flex = '4';
        descbox.style.flex = '10';
        namebox.style.display = 'inline-block';
        descbox.style.display = 'inline-block';
        buttbox.style.display = 'inline-block';
        namebox.innerHTML = `<p>${name}</p>`;
        descbox.innerHTML = `<p>${desc}</p>`;
        button.onclick = OnClick;
        button.innerHTML = `<p id="btn ${id}">显示</p>`;

        button.style.backgroundColor = 'grey';
        button.style.margin = '5px';
        buttbox.appendChild(button);

        div.appendChild(buttbox);
        div.appendChild(namebox);
        main.appendChild(div);
    }
}