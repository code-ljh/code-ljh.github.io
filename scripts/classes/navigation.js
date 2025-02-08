export function initNavigation() {
    var navbar = document.getElementById("nav-bar");
    var navigations;
    
    fetch('/assets/navs.json')
        .then((response) => {return response.json();})
        .then((json) => {
            navigations = json["navigations"];
            var idx = 0;
            for (var i of json["entry"]) {
                var navicon = document.createElement("div");
                var navimg = document.createElement("img");
                navimg.src = navigations[i]["icon"];
                navimg.className = "nav-images";
                navicon.className = "nav-items";
                navicon.id = `${navigations[i]["link"]}`;
                navicon.style.top = `${idx * 7}vh`;
                navicon.onclick = (event) => {
                    var target = event.target;
                    if (event.target.tagName == "IMG") target = event.target.parentNode;
                    window.location.href = `/web.html?${target.id}`;
                };
                navicon.appendChild(navimg);
                navbar.appendChild(navicon);
                idx += 1;
            }
        })
} 