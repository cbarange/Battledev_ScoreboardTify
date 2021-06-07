const output = JSON.parse(require('xml-js').xml2json(require('fs').readFileSync('html_scorebard.xml', 'utf8'), {compact: true, spaces: 4}))

res=output.Document.tr.map(e=> { return {rank: e.th._text, pseudo: e.td[0]._text, langage: e.td[1]._text, exercice: e.td[2]._text, hour: e.td[3]._text, corporation_school: e.td[4]._text?e.td[4]._text:''}} )

console.log(JSON.stringify(res))