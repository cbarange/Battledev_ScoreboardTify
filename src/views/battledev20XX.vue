<template>
  <div class="battledev2020">
    <v-card class="mx-auto my-12" max-width="1200">
      <v-card-title class="text-h3 mb-1">
        Tu as gardé des archives ? Partage les avec nous 🙂
      </v-card-title>
      <v-card-text>
        Si tu as les classements des années précédentes (ou des versions plus complètes 2015-2016-2017-2018-2019-2020), fait un pull request sur `/public/static/battledevYYYY_score.json` ou ouvre une issue sur le <a target="_blank" href="https://github.com/cbarange/Battledev_ScoreboardTify/issues"> github </a> en mettant le lien vers le classement 👏
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

  export default {
    name:'battledev2020',
    data: () => {
      return {
      }
    },
  }
</script>