export function initSettings() {
    var entry = ["link-behavior", "show-leading"];

    var assets = {
        "link-behavior": {
            "description": "Make a new tab when you click on a link? ",
            "options": ["anothertab", "resettab"]
        },
        "show-leading": {
            "description": "Show the leading bar? (The one on the top.)",
            "options": ["yes", "no"]
        }
    };

    function Valid(json) {
        try {
            json = JSON.parse(json);
        } catch (SyntaxError) {
            return false;
        }
        if (typeof(json) != "object") return false;
        for (var i of entry)
            if (!assets[i]["options"].includes(json[i])) {
                return false;
            }
        return true;
    }

    var defaults = {
        "link-behavior": "anothertab",
        "show-leading": "yes"
    };

    if (!Valid(localStorage.getItem("settings"))) {
        localStorage.setItem("settings", JSON.stringify(defaults));
    } else {
        defaults = JSON.parse(localStorage.getItem("settings"));
    }

    var main = document.getElementById("main-left");
    
    for (var i of entry) {
        main.innerHTML += `
            <div id="${i}" class="card" style="display: flex; justify-content: center; align-items:center">
                <p>${assets[i]["description"]}</p>
                <p>${defaults[i]}</p>
            </div>
        `;
    }

    for (var i of entry) {
        document.getElementById(i).onclick = (target) => {
            var tar = target.target;
            if (tar.tagName == "P") tar = tar.parentNode;

            defaults[tar.id] = assets[tar.id]["options"][(!(assets[tar.id]["options"][1] == defaults[tar.id])) + 0];
            localStorage.setItem("settings", JSON.stringify(defaults));
            setTimeout(() => {window.location.href = "/web.html?nav.settings"}, 200);
        }
    } 
}

export function GetSettings(key) {
    var set = JSON.parse(localStorage.getItem("settings"));
    console.log(set, key);
    return set[key];
}