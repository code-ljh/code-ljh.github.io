setTimeout(() => {
    function Main() {
        var top = 0;
        for (var i of iconlist) {
            var name = i.name;
            var link = i.link;
            var type = i.type;

            var create = document.createElement('div');
            var subcre = document.createElement('a');
            var subimg = document.createElement('img');

            create.style.top = `${top}vh`;
            create.style.height = `6vh`;

            subcre.className = 'aligntext';
            if (type === 'normal') {
                subcre.href = `${prev}/${link}`;
            } else if (type == 'newtab') {
                subcre.href = `${link}`;
                subcre.target = '_blank';
            }

            subimg.style.width = '5vh';
            subimg.style.height = '5vh';
            subimg.src = `${prev}/assets/${name}.svg`;

            create.appendChild(subcre);
            subcre.appendChild(subimg);
            main.appendChild(create);

            top += 6;
        }
    }

    var url = document.URL;
    var prev = (url.includes('blogs') || url.includes('category') ? ".." : "");
    var main = document.getElementById("main-icons");
    var iconlist = [];

    fetch(prev + '/data/icons.json')
        .then(response => response.json())
        .then(data => {
            iconlist = data;
            Main();
        });
}, 200);