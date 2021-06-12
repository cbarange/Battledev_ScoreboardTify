# [Battledev ScoreboardTify](https://scoreboardtify.netlify.app/)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/cbarange/Battledev_ScoreboardTify)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/cbarange/Battledev_ScoreboardTify)](https://GitHub.com/cbarange/Battledev_ScoreboardTify/pulls)
[![GitHub issues](https://img.shields.io/github/issues/cbarange/Battledev_ScoreboardTify)](https://GitHub.com/cbarange/Battledev_ScoreboardTify/issues/)
[![GitHub contributors](https://img.shields.io/github/contributors/cbarange/Battledev_ScoreboardTify)](https://GitHub.com/cbarange/Battledev_ScoreboardTify/contributors/)
[![ViewCount](https://views.whatilearened.today/views/github/cbarange/Battledev_ScoreboardTify.svg)](https://views.whatilearened.today/views/github/cbarange/Battledev_ScoreboardTify.svg)
[![GitHub license](https://img.shields.io/github/license/cbarange/Battledev_ScoreboardTify)](https://github.com/cbarange/Battledev_ScoreboardTify/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/1cf5efd4-bc30-4217-8306-6cc6d27cb57e/deploy-status)](https://app.netlify.com/sites/scoreboardtify/deploys)

<img alt="" src="https://raw.github.com/cbarange/Battledev_ScoreboardTify/master/public/static/logo.jpg" height="60px" /> 

**Archive des classements de la Battledev** et plus encore *(pas encore mais bientôt🙂)* 

* Site : https://scoreboardtify.netlify.app/
* Archive Json : https://github.com/cbarange/Battledev_ScoreboardTify/tree/main/public/static
* Retrouver tous les énoncés et solution : https://www.isograd.com/FR/solutionconcours.php

## TODO / Idée de stats sympa

* [ ] écoles / entreprises les plus representées
* [ ] Saisir son pseudo pour voir son classement parmis son langage ecole numéro d'exercice heure de soumission, voir sa progression au fil des ans
* [ ] Temps de résolution moyen par exo
* [ ] Répartition des participants en fonction des exo / langage, Un mode qui ne prend en compte que les 100 premiers

---
## Récupération et transformation des classements en JSON

### Récupération des classements 2015-2020

> Merci à Colios13 pour les archives

* [novembre 2015 saison 6 (indiv + école)](https://www.blogdumoderateur.com/battle-dev-tous-les-resultats/)
* [mars 2016 saison 7 (indiv + école)](https://www.blogdumoderateur.com/resultats-battledev-mars-2016/)
* [novembre 2016 saison 8 (indiv + école)](https://www.blogdumoderateur.com/resultats-battledev-novembre-2016/)
* [mars 2017 saison 9 (indiv + école)](https://web.archive.org/web/20170517042207/http://battledev.blogdumoderateur.com/classement-battledev-mars-2017-saison-9.pdf)
* [novembre 2017 saison 10 (indiv + école)](https://www.blogdumoderateur.com/resultats-battledev-novembre-2017/)
* [mars 2018 saison 11 (indiv + école)](https://www.blogdumoderateur.com/resultats-battledev-mars-2018/)
* [novembre 2018 saison 12 (indiv + école)](https://www.blogdumoderateur.com/resultats-battledev-novembre-2018/)
* **Manque Individuel** [mars 2019 saison 13 (première page indiv + école)](https://web.archive.org/web/20190831145339/https://battledev.blogdumoderateur.com/#resultats)
* **Manque Individuel** [novembre 2019 saison 14 (première page indiv + entreprise et école)](https://web.archive.org/web/20191210085034/https://battledev.blogdumoderateur.com/) 
* **Manque Individuel** [mars 2020 saison 15 (première page indiv + entreprise et école)](https://web.archive.org/web/20200804133527/https://battledev.blogdumoderateur.com/)
* **Manque Entreprise & École** [novembre 2020 saison 16 (première page indiv)](https://web.archive.org/web/20210118190916/https://battledev.blogdumoderateur.com/) & [indiv](https://github.com/PerthuisQuentin/battle-dev/blob/main/edition-16/ranking.json)

**Convertion PDF/TXT to JSON**
```regex
^([0-9]*)\ (.*)\ ([A-Za-z3#\-\+]*)\ ([0-9])\ ([0-9][0-9]:[0-9][0-9]:[0-9][0-9])\n

{"rank":"$1","pseudo":"$2","language":"$3","exercice":"$4","last_answer_time":"$5","company_school":""},\n
```

###  Récupération du classement Juin 2021
```bash
echo "<Document>" > battledev_2021_classement.xml

for i in {1..120}; do curl -s --location --request POST 'https://battledev.blogdumoderateur.com/table_general.php' --form 'type="json"' --form 'rang="asc"' --form "page=$i" | jq -r ".table_tbody" >> battledev_2021_classement.xml; done

echo "</Document>" >> battledev_2021_classement.xml
```

```js
// yarn add xml-js or npm install xml-js

const output = JSON.parse(require('xml-js').xml2json(
  require('fs').readFileSync('battledev_2021_classement.xml', 'utf8'), {compact: true, spaces: 4}
  ))

res=output.Document.tr.map(e=> { 
  return {
    rank: e.th._text, 
    pseudo: e.td[0]._text,
    langage: e.td[1]._text,
    exercice: e.td[2]._text,
    hour: e.td[3]._text,
    corporation_school: e.td[4]._text?e.td[4]._text:''}
  })

console.log(JSON.stringify(res))

// node jsonnify_battledev_2021_ranking.js > battledev2021_score.json
```

---
## Contribuer 👏

Venez c'est plus fun à plusieurs 😋

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

