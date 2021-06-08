<template>
  <div class="battledev2019_mars">

    <v-tabs v-model="currentTab" fixed-tabs background-color="indigo" dark >
      <v-tab>Individuels</v-tab>    
      <v-tab>Écoles</v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <v-card class="mx-auto my-12" max-width="75%">
          <v-card-title class="text-h4 mb-1">
            👉 Cherche classement complet mars 2019 (y a que les 25 premiers ici)
          </v-card-title>
          <v-card-text>
            Si tu as le classement complet mars 2019, fait un pull request sur `/public/static/battledev2019Mars_score.json` ou ouvre une issue sur le <a target="_blank" href="https://github.com/cbarange/Battledev_ScoreboardTify/issues"> github </a> en mettant le lien vers le classement 👏
          </v-card-text>
        </v-card>
        <score_table :title="`INCOMPLET - ${title}`" :headers="headers_individual" :items="scoreboard.individual" items_per_page="50"/>
      </v-tab-item>
      <v-tab-item>
        <score_table :title="title" :headers="headers_enterprise_school" :items="scoreboard.school" items_per_page="200"/>
      </v-tab-item>      
    </v-tabs-items>  
  </div>
</template>

<script>
  import battledev2019_score from '../../public/static/battledev2019Mars_score.json'  
  import score_table from '../components/score_table'  

  export default {
    name:'battledev2019_mars',
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
        scoreboard: battledev2019_score,
        title:`BattleDev 2019 Saison ${battledev2019_score.edition} Scoreboard`
      }
    },
  }
</script>
