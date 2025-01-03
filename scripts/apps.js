var hasAdditional = true;
try {
    AdditionalApp;
} catch (ReferenceError) {
    hasAdditional = false;
}

if (hasAdditional) applist = [AdditionalAppName].concat(applist);
if (hasAdditional) appicons = [""].concat(appicons);
if (hasAdditional) appfunction = [AdditionalApp].concat(appfunction);

var hasAdditional2 = true;
try {
    Additional2App;
} catch (ReferenceError) {
    hasAdditional2 = false;
}

if (hasAdditional2) applist = [Additional2AppName].concat(applist);
if (hasAdditional2) appicons = [""].concat(appicons);
if (hasAdditional2) appfunction = [Additional2App].concat(appfunction);

var parent = document.getElementById("body-right");

for (var i in applist) {
    var subcard = document.createElement("div");
    subcard.className = "card";
    var cardbody = document.createElement("div");
    cardbody.className = "card-body";
    cardbody.style.display = "none";
    var cardtitle = document.createElement("div");
    cardtitle.className = "card-title";
    cardtitle.style.cursor = "pointer";
    cardtitle.onclick = (ele) => {
        if (ele.srcElement.parentNode.children[1].style.display == "none") {
            ele.srcElement.parentNode.children[1].style.display = "block";
        } else ele.srcElement.parentNode.children[1].style.display = "none"
    };
    var cardtitletext = document.createElement("b");
    cardtitletext.style.marginLeft = "5px";
    cardtitletext.innerText = applist[i];
    cardtitle.innerHTML = appicons[i];
    subcard.appendChild(cardtitle);
    subcard.appendChild(cardbody);
    cardtitle.appendChild(cardtitletext);
    parent.appendChild(subcard);
    appfunction[i](cardbody, cardtitle);
}