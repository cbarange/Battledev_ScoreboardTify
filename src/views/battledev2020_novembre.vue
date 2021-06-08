<template>
  <div class="battledev2020_novembre">

    <v-tabs v-model="currentTab" fixed-tabs background-color="indigo" dark >
      <v-tab>Individuels</v-tab> 
      <v-tab>Entreprises</v-tab>  
      <v-tab>Écoles</v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <score_table :title="title" :headers="headers_individual" :items="scoreboard.individual" items_per_page="50"/>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mx-auto my-12" max-width="75%">
          <v-card-title class="text-h2 mb-1">
            Quelqu'un a le classement Entreprise Novembre 2020 ? 🙏
          </v-card-title>
          <v-card-text>
            Si tu as le classement novembre 2020, fait un pull request sur `/public/static/battledev2020Nov_score.json` ou ouvre une issue sur le <a target="_blank" href="https://github.com/cbarange/Battledev_ScoreboardTify/issues"> github </a> en mettant le lien vers le classement 👏
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mx-auto my-12" max-width="75%">
          <v-card-title class="text-h2 mb-1">
            Quelqu'un a le classement Écoles Novembre 2020 ? 🙏
          </v-card-title>
          <v-card-text>
            Si tu as le classement novembre 2020, fait un pull request sur `/public/static/battledev2020Nov_score.json` ou ouvre une issue sur le <a target="_blank" href="https://github.com/cbarange/Battledev_ScoreboardTify/issues"> github </a> en mettant le lien vers le classement 👏
          </v-card-text>
        </v-card>
      </v-tab-item>      
    </v-tabs-items>  
  </div>
</template>

<script>
  import battledev2020_score from '../../public/static/battledev2020Nov_score.json'  
  import score_table from '../components/score_table'  

  export default {
    name:'battledev2020_novembre',
    components: { score_table },
    data: () => {
      return {
        currentTab:'',        
        headers_individual: [
        { text: 'Rang', align: 'start', filterable: false, value: 'rank', },
        { text: 'Pseudo', value: 'pseudo' },
        { text: 'Langage', value: 'language' },
        { text: 'Exercices', value: 'exercice' },
        { text: 'Heure de la dernière réponse', value: 'last_answer_time' }
        ],
        headers_enterprise_school: [
        { text: 'Rang',  align: 'center', filterable: false, value: 'rank', },
        { text: 'Nom', align: 'center', value: 'name' }
        ],
        scoreboard: battledev2020_score,
        title:`BattleDev 2020 Saison ${battledev2020_score.edition} Scoreboard`
      }
    },
  }
</script>
