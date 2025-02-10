import json

name = input()
description = input()
title = input()

with open('input.md', 'r', encoding='UTF-8') as file:
    with open(f'articles/{name}.md', 'w', encoding='UTF-8') as file2:
        file2.write(file.read())
    with open(f'assets/articles.json', 'r', encoding='UTF-8') as file2:
        obj = json.loads(file2.read())
        obj[name] = description
        obj['articles'].append(name)
    with open(f'assets/articles.json', 'w', encoding='UTF-8') as file2:
        file2.write(json.dumps(obj, indent=4))
    with open(f'assets/pages.json', 'r', encoding='UTF-8') as file2:
        obj = json.loads(file2.read())
        obj[f'articles.{name}'] = {'title': title}
    with open(f'assets/pages.json', 'w', encoding='UTF-8') as file2:
        file2.write(json.dumps(obj, indent=4))