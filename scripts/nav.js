document.title = title;

document.body.innerHTML += `
    <div id="headbar" class="shadowborder">
        <div id="headbar-title" class="darkover" style="cursor:pointer">
            <b style="font-size:20px" id="headbar-title-text">
                code-ljh.github.io
            </b>
        </div>

        <div id="headbar-titlebar">
            <div id="set-svg-1"></div>
            <b style="margin-left: 5px; font-size: 24px"> ${title} </b>
        </div>

        <div id="headbar-user" class="darkover" style="cursor:pointer">
            <a href="https://www.luogu.com.cn/user/528472#main" style="text-decoration: none;">
                <b style="margin:0px;color:rgb(254, 76, 97);display:flex;justify-content: center;align-items: center;">
                    <p style="margin: 5px">CodeLJH</p>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#3498db"
                        style="margin-left: -3px;">
                        <path
                            d="M16 8C16 6.84375 15.25 5.84375 14.1875 5.4375C14.6562 4.4375 14.4688 3.1875 13.6562 2.34375C12.8125 1.53125 11.5625 1.34375 10.5625 1.8125C10.1562 0.75 9.15625 0 8 0C6.8125 0 5.8125 0.75 5.40625 1.8125C4.40625 1.34375 3.15625 1.53125 2.34375 2.34375C1.5 3.1875 1.3125 4.4375 1.78125 5.4375C0.71875 5.84375 0 6.84375 0 8C0 9.1875 0.71875 10.1875 1.78125 10.5938C1.3125 11.5938 1.5 12.8438 2.34375 13.6562C3.15625 14.5 4.40625 14.6875 5.40625 14.2188C5.8125 15.2812 6.8125 16 8 16C9.15625 16 10.1562 15.2812 10.5625 14.2188C11.5938 14.6875 12.8125 14.5 13.6562 13.6562C14.4688 12.8438 14.6562 11.5938 14.1875 10.5938C15.25 10.1875 16 9.1875 16 8ZM11.4688 6.625L7.375 10.6875C7.21875 10.8438 7 10.8125 6.875 10.6875L4.5 8.3125C4.375 8.1875 4.375 7.96875 4.5 7.8125L5.3125 7C5.46875 6.875 5.6875 6.875 5.8125 7.03125L7.125 8.34375L10.1562 5.34375C10.3125 5.1875 10.5312 5.1875 10.6562 5.34375L11.4688 6.15625C11.5938 6.28125 11.5938 6.5 11.4688 6.625Z">
                        </path>
                    </svg>
                </b>
            </a>
        </div>

        <div id="headbar-expand" class="darkover" style="cursor:pointer">
            <svg id="expand-0" onclick="Expand(0)" style="display:none" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 10H15M15 10L13 8M15 10L13 12M4 14H6.67452C7.1637 14 7.40829 14 7.63846 14.0553C7.84254 14.1043 8.03763 14.1851 8.21657 14.2947C8.4184 14.4184 8.59136 14.5914 8.93726 14.9373L9.06274 15.0627C9.40865 15.4086 9.5816 15.5816 9.78343 15.7053C9.96237 15.8149 10.1575 15.8957 10.3615 15.9447C10.5917 16 10.8363 16 11.3255 16H12.6745C13.1637 16 13.4083 16 13.6385 15.9447C13.8425 15.8957 14.0376 15.8149 14.2166 15.7053C14.4184 15.5816 14.5914 15.4086 14.9373 15.0627L15.0627 14.9373C15.4086 14.5914 15.5816 14.4184 15.7834 14.2947C15.9624 14.1851 16.1575 14.1043 16.3615 14.0553C16.5917 14 16.8363 14 17.3255 14H20M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.07989 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg id="expand-1" onclick="Expand(1)" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10H9M9 10L11 12M9 10L11 8M4 14H6.67452C7.1637 14 7.40829 14 7.63846 14.0553C7.84254 14.1043 8.03763 14.1851 8.21657 14.2947C8.4184 14.4184 8.59136 14.5914 8.93726 14.9373L9.06274 15.0627C9.40865 15.4086 9.5816 15.5816 9.78343 15.7053C9.96237 15.8149 10.1575 15.8957 10.3615 15.9447C10.5917 16 10.8363 16 11.3255 16H12.6745C13.1637 16 13.4083 16 13.6385 15.9447C13.8425 15.8957 14.0376 15.8149 14.2166 15.7053C14.4184 15.5816 14.5914 15.4086 14.9373 15.0627L15.0627 14.9373C15.4086 14.5914 15.5816 14.4184 15.7834 14.2947C15.9624 14.1851 16.1575 14.1043 16.3615 14.0553C16.5917 14 16.8363 14 17.3255 14H20M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.07989 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>

    <div id="navigation" class="shadowborder">
    </div>

    <div id="body">
        <div id="body-left">
            <div id="main" class="card" style="flex:1">
                <div class="card-title" id="main-title">
                    <div id="set-svg-2"></div>

                    <b style="margin-left: 5px" id="body-settitle"> ${title} </b>
                </div>

                <div class="card-body" id="main-body">
                </div>
            </div>
        </div>

        <div id="body-right">
            
        </div>
    </div>`;

var navigations = ["主页", "应用", "分类", "文章"];
var icons = [
    `<svg style="flex:1;margin:5px" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />            </svg>`,
    `<svg style="flex:1;margin:5px" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.5L11.6078 3.22062C11.7509 3.14014 11.8224 3.09991 11.8982 3.08414C11.9654 3.07019 12.0346 3.07019 12.1018 3.08414C12.1776 3.09991 12.2491 3.14014 12.3922 3.22062L20 7.5M4 7.5V16.0321C4 16.2025 4 16.2876 4.02499 16.3637C4.04711 16.431 4.08326 16.4928 4.13106 16.545C4.1851 16.6041 4.25933 16.6459 4.40779 16.7294L12 21M4 7.5L12 11.5M12 21L19.5922 16.7294C19.7407 16.6459 19.8149 16.6041 19.8689 16.545C19.9167 16.4928 19.9529 16.431 19.975 16.3637C20 16.2876 20 16.2025 20 16.0321V7.5M12 21V11.5M20 7.5L12 11.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
    `<svg style="flex:1;margin:5px" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10L12 3L16 10H8Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14C8.433 14 10 15.567 10 17.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 14H21V21H14V14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    `<svg style="flex:1;margin:5px" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8H21M3 12H21M3 16H21M3 20H15M3 4H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
];
var link = ["", "applications.html", "categories.html", "articles.html"];

var nav = document.getElementById("navigation");

for (var i in navigations) {
    var newd = document.createElement("div");
    newd.style.display = "flex";
    newd.style.alignItems = "center";
    newd.style.justifyContent = "center";
    newd.className = "shadowborder darkover";
    console.log(navigations[i], under);
    if (under == navigations[i]) newd.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
    var a = document.createElement("a");
    a.href = pre + link[i];
    a.innerHTML += icons[i];
    newd.appendChild(a);
    nav.appendChild(newd);
}

for (var i in navigations) {
    if (navigations[i] == under) {
        document.getElementById("set-svg-1").innerHTML = icons[i];        
        document.getElementById("set-svg-1").children[0].style.width = 32;
        document.getElementById("set-svg-1").children[0].style.height = 32;
        document.getElementById("set-svg-1").children[0].style.margin = 2;
        document.getElementById("set-svg-2").innerHTML = icons[i];
        document.getElementById("set-svg-2").children[0].style.width = 24;
        document.getElementById("set-svg-2").children[0].style.height = 24;
        document.getElementById("set-svg-2").children[0].style.margin = 2;
    }
} 

function Expand(ele) {
    if (ele) {
        document.getElementById("expand-0").style.display = "block";
        document.getElementById("expand-1").style.display = "none";
        document.getElementById("body-left").style.right = "0";
        document.getElementById("body-right").style.display = "none";
    } else {
        document.getElementById("expand-0").style.display = "none";
        document.getElementById("expand-1").style.display = "block";
        document.getElementById("body-left").style.right = "35%";
        document.getElementById("body-right").style.display = "flex";
    }
}

if (document.getElementById("passage")) document.getElementById("main-body").appendChild(document.getElementById("passage"));