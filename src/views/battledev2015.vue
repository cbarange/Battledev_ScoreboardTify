<template>
  <div class="battledev2015">    
    <v-card class="mx-auto my-12" max-width="90%">
      <v-card-title class="text-h3 mb-1">
        👉 Cherche classement Entreprise 2015
      </v-card-title>
      <v-card-text>
        Si tu as les classements Entreprise de 2015, fait un pull request sur `/public/static/battledev2015_score.json` ou ouvre une issue sur le <a target="_blank" href="https://github.com/cbarange/Battledev_ScoreboardTify/issues"> github </a> en mettant le lien vers le classement 👏
      </v-card-text>
    </v-card>

    <v-tabs v-model="currentTab" fixed-tabs background-color="indigo" dark >
    <v-tab>Individuels</v-tab>
    <v-tab>Entreprises</v-tab>
    <v-tab>Écoles</v-tab>
  </v-tabs>
  
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <score_table title="BattleDev 2015 Scoreboard" :headers="headers_individual" :items="scoreboard.individual" items_per_page="50"/>
      </v-tab-item>
      <v-tab-item>
        <score_table title="BattleDev 2015 Scoreboard" :headers="headers_enterprise_school" :items="scoreboard.enterprise" items_per_page="200"/>
      </v-tab-item>
      <v-tab-item>
        <score_table title="BattleDev 2015 Scoreboard" :headers="headers_enterprise_school" :items="scoreboard.school" items_per_page="200"/>
      </v-tab-item>      
    </v-tabs-items>
  </div>
</template>

<script>
  import battledev2015_score from '../../public/static/battledev2015_score.json'  
  import score_table from '../components/score_table'  

  export default {
    name:'battledev2015',
    components: { score_table },
    data: () => {
      return {
        currentTab:'',   
        headers_individual: [
          { text: 'Rang', align: 'start', filterable: false, value: 'rank', },
          { text: 'Pseudo', value: 'pseudo' },
          { text: 'Langage', value: 'langage' },
          //{ text: 'Exercices', value: 'exercice' },
          //{ text: 'Heure de la dernière réponse', value: 'hour' },
          //{ text: 'Entreprise / École', value: 'company_school' },
        ],
        headers_enterprise_school: [
          { text: 'Rang',  align: 'center', filterable: false, value: 'rank', },
          { text: 'Nom', align: 'center', value: 'name' }
        ],
        scoreboard: battledev2015_score
      }
    },
  }
</script>