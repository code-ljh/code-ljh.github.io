import * as set from '/script/library/settings.js';

var templatescripts = [
    ["/library/highlight.js", "normal"],
    ["/library/katex.js", "normal"],
    ["/library/marked.js", "normal"]
];

var templatestyles = [
    "/library/katex.css",
    "/library/highlight.css",
    `/styles/${set.SettingItem("display.brightness")}-main.css`
];

try {
    if (applicationsname !== "__list__") {
        templatescripts.push([`/applications/${applicationsname}/${applicationsname}.js`, "module"]);
        templatestyles.push(`/applications/${applicationsname}/${applicationsname}.css`);
    }
} catch { }

export function LoadScripts() {
    for (var i of templatescripts) {
        var element = document.createElement("script");
        element.src = i[0];
        if (i[1] === "module") {
            element.type = i[1];
        }
        document.head.appendChild(element);
    }

    for (var i of templatestyles) {
        var element = document.createElement("link");
        element.href = i;
        element.rel = "stylesheet";
        document.head.appendChild(element);
    }

    var favicon = document.createElement("link");
    favicon.href = "/asset/favicon.svg";
    favicon.rel = "icon";
    document.head.appendChild(favicon);
}