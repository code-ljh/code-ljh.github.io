import * as set from '/script/library/settings.js';
import * as tag from '/script/library/tags.js';

setTimeout(
    () => {
        var main = document.getElementById("main");
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");
        var theadline = document.createElement("tr");
        var tname = document.createElement("th");
        var tval = document.createElement("th");
        main.appendChild(table);
        table.classList.add("modern-table");
        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(theadline);
        theadline.appendChild(tname);
        theadline.appendChild(tval);
        tname.classList.add("setting-table-name");
        tname.innerText = "Item";
        tval.classList.add("setting-table-value");
        tval.innerText = "Value";

        for (var i in set.Settings) {
            var tbodyline = document.createElement("tr");
            var ttname = document.createElement("th");
            var ttvalue = document.createElement("th");
            tbody.appendChild(tbodyline);
            tbodyline.appendChild(ttname);
            tbodyline.appendChild(ttvalue);
            ttname.innerText = i;
            ttname.classList.add("setting-table-name");
            ttvalue.classList.add("setting-taglist");
            ttvalue.classList.add("setting-table-value");

            if (set.Settings[i][0]) {
                for (var j of set.Settings[i]) {
                    var ttag = tag.FacelessTag(j);
                    ttvalue.appendChild(ttag);
                    ttag.settingitem = i;

                    if (j == set.SettingItem(i)) {
                        ttag.classList.add("articles-tag-active");
                    } else {
                        ttag.classList.add("hover-translate");
                        ttag.onclick = function (evt) {
                            var target = evt.currentTarget;
                            var txt = target.innerText;
                            localStorage[target.settingitem] = txt;
                            console.log(target);
                            window.location.href = window.location.href;
                        };
                    }
                }
            } else if (set.Settings[i].max) {
                var tinput = document.createElement("input");
                ttvalue.appendChild(tinput);
                tinput.classList.add("modern-input");
                tinput.value = set.SettingItem(i);
                tinput.max = set.Settings[i].max;
                tinput.min = set.Settings[i].min;
                tinput.defaultValue = set.Settings[i].default;
                tinput.type = "number";
                tinput.onchange = (evt) => {
                    var ele = evt.currentTarget;
                    var int = parseInt(ele.value);
                    if (!(ele.min <= int && int <= ele.max)) 
                        ele.value = ele.defaultValue;
                    set.UpdateItem(i, ele.value);
                }
            }
        }
    }, 100
);