export var Settings = {
    "display.brightness": ["dark", "light"],
    "display.articleslist": ["traditional", "simplified"],
    "display.articleslist.simplified": ["tags", "categories"],
    "display.taglist.linecount": {"default": 3, "max": 10, "min": 1}
};

export function SettingItem(key) {
    if (localStorage.getItem(key) == null) {
        if (Settings[0])
            localStorage.setItem(key, Settings[key][0]);
        else
            localStorage.setItem(key, Settings[key].default);
    }
    return localStorage.getItem(key);
}

export function UpdateItem(key, value) {
    localStorage.setItem(key, value);
}