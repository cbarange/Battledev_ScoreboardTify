<template>
  <div class="battledev2021_juin">

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
        <score_table :title="title" :headers="headers_enterprise_school" :items="scoreboard.enterprise" items_per_page="200"/>
      </v-tab-item>
      <v-tab-item>
        <score_table :title="title" :headers="headers_enterprise_school" :items="scoreboard.school" items_per_page="200"/>
      </v-tab-item>      
    </v-tabs-items>  
  </div>
</template>

<script>
  import battledev2021_score from '../../public/static/battledev2021Juin_score.json'  
  import score_table from '../components/score_table'  

  export default {
    name:'battledev2021_juin',
    components: { score_table },
    data: () => {
      return {
        currentTab:'',        
        headers_individual: [
          { text: 'Rang', align: 'start', filterable: false, value: 'rank', },
          { text: 'Pseudo', value: 'pseudo' },
          { text: 'Langage', value: 'language' },
          { text: 'Exercices', value: 'exercice' },
          { text: 'Heure de la dernière réponse', value: 'last_answer_time' },
          { text: 'Entreprise / École', value: 'company_school' },
        ],
        headers_enterprise_school: [
          { text: 'Rang',  align: 'center', filterable: false, value: 'rank', },
          { text: 'Nom', align: 'center', value: 'name' }
        ],
        scoreboard: battledev2021_score,
        title:`BattleDev 2021 Saison ${battledev2021_score.edition} Scoreboard`
      }
    },
  }
</script>
