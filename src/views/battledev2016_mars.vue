<template>
  <div class="battledev2016_mars">
    <v-card class="mx-auto my-12" max-width="90%">
      <v-card-title class="text-h3 mb-1">
        👉 Cherche classement Entreprise/Langage Mars 2016
      </v-card-title>
      <v-card-text>
        Si tu as les classements Entreprise ou le classement complet (avec langage, numéro d'exercice et l'heure de la dernière réponse) de mars 2016, fait un pull request sur `/public/static/battledev2016Mars_score.json` ou ouvre une issue sur le <a target="_blank" href="https://github.com/cbarange/Battledev_ScoreboardTify/issues"> github </a> en mettant le lien vers le classement 👏
      </v-card-text>
    </v-card>

    <v-tabs v-model="currentTab" fixed-tabs background-color="indigo" dark >
    <v-tab>Individuels</v-tab>
    <v-tab>Entreprises</v-tab>
    <v-tab>Écoles</v-tab>
  </v-tabs>
  
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <score_table title="BattleDev Mars 2016 Scoreboard" :headers="headers_individual" :items="scoreboard.individual" items_per_page="50"/>
      </v-tab-item>
      <v-tab-item>
        <score_table title="BattleDev Mars 2016 Scoreboard" :headers="headers_enterprise_school" :items="scoreboard.enterprise" items_per_page="200"/>
      </v-tab-item>
      <v-tab-item>
        <score_table title="BattleDev Mars 2016 Scoreboard" :headers="headers_enterprise_school" :items="scoreboard.school" items_per_page="200"/>
      </v-tab-item>      
    </v-tabs-items> 
  </div>
</template>

<script>
  import battledev2016_score from '../../public/static/battledev2016Mars_score.json'  
  import score_table from '../components/score_table'  

  export default {
    name:'battledev2016_mars',
    components: { score_table },
    data: () => {
      return {
        currentTab:'',        
        headers_individual: [
          { text: 'Rang', align: 'start', filterable: false, value: 'rank', },
          { text: 'Pseudo', value: 'pseudo' },
          // { text: 'Langage', value: 'language' },
          // { text: 'Exercices', value: 'exercice' },
          // { text: 'Heure de la dernière réponse', value: 'last_answer_time' },
          //{ text: 'Entreprise / École', value: 'company_school' },
        ],
        headers_enterprise_school: [
          { text: 'Rang',  align: 'center', filterable: false, value: 'rank', },
          { text: 'Nom', align: 'center', value: 'name' }
        ],
        scoreboard: battledev2016_score
      }
    },
  }
</script>