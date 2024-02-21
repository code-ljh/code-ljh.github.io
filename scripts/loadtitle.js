var list = document.getElementsByClassName('set-title');
for (var element of list) 
    element.innerHTML = element.innerHTML.replace("${title}", document.title);