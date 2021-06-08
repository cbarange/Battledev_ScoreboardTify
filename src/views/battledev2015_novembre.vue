<template>
  <div class="battledev2015_novembre">

    <v-tabs v-model="currentTab" fixed-tabs background-color="indigo" dark >
    <v-tab>Individuels</v-tab>
    <v-tab>Écoles</v-tab>
  </v-tabs>
  
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <score_table :title="title" :headers="headers_individual" :items="scoreboard.individual" items_per_page="50"/>
      </v-tab-item>
      <v-tab-item>
        <score_table :title="title" :headers="headers_enterprise_school" :items="scoreboard.school" items_per_page="200"/>
      </v-tab-item>      
    </v-tabs-items>
  </div>
</template>

<script>
  import battledev2015_score from '../../public/static/battledev2015Nov_score.json'  
  import score_table from '../components/score_table'  

  export default {
    name:'battledev2015_novembre',
    components: { score_table },
    data: () => {
      return {
        currentTab:'',   
        headers_individual: [
          { text: 'Rang', align: 'start', filterable: false, value: 'rank', },
          { text: 'Pseudo', value: 'pseudo' },
          { text: 'Langage', value: 'language' }
        ],
        headers_enterprise_school: [
          { text: 'Rang',  align: 'center', filterable: false, value: 'rank', },
          { text: 'Nom', align: 'center', value: 'name' }
        ],
        scoreboard: battledev2015_score,
        title:`BattleDev 2015 Saison ${battledev2015_score.edition} Scoreboard`
      }
    },
  }
</script>