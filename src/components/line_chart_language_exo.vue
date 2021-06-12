<template>
  <div class="line_chart_language_exo">
    
    <apexchart type="line" height="450" :options="chartOptions" :series="series"></apexchart>
    

    <v-alert class="mx-auto" border="left" align="center" type="info" max-width="85%">
      <h4 class="text-h6">
        Taux de validation totale
      </h4>

      <v-row align="center" no-gutters >
        <v-col class="grow" v-for="item in total_pourcent_by_language" :key="item.name">
          {{item.name}} {{item.data}}% 
        </v-col>
      </v-row>

      
    </v-alert>
  
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  
  import battledev_s17 from '../../public/static/battledev2021Juin_score.json'  

  export default {
    name:'line_chart_language_exo',
    components: { apexchart: VueApexCharts},
    data: () => {
      return {
        total_pourcent_by_language:'',
        series: [],
          chartOptions: {
            chart: {
              height: 450,
              type: 'line',
              zoom: { enabled: false },
            },
            colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#2E93fA', '#66DA26', '#546E7A', '#FF9800', '#F44336', '#E91E63', '#9C27B0'],
            dataLabels: { enabled: false, },
            stroke: { curve: 'straight' }, // straight smooth stepline
            title: { text: `Line Saison ${battledev_s17.edition}: Taux de validation/langage/exo`, },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: { size: 0 },
            xaxis: {
              categories: [],
              //title: { text: 'Exercice' }
            },
            yaxis: {
              title: { text: '% par langage' },
              min: 0,
              max: 100
            },
            
          }
      }
    },
    methods:{

    },
    created:function(){
      let all_exercice = Array.from(battledev_s17.individual.reduce((r,v)=>r.add(v.exercice),new Set())).sort((a,b)=>parseInt(a)-parseInt(b))
      
      let all_exercice_with_numberofparticipant = battledev_s17.individual.reduce((r,v)=>r.has(v.language)?r.set(v.language,r.get(v.language)+1):r.set(v.language,1),new Map())

      this.chartOptions.xaxis.categories = all_exercice.map(e=>`Exo ${e}`)

      // For each language create hashmap contain's number of participant who succed each exo like 
      // [{language:'python',exo:{'1':400,'2':120,'3':80,...}},{language:'node',...]
      let data_as_map = battledev_s17.individual.reduce((r,v) => {
        if(!r.has(v.language))
          r.set(v.language,new Map(all_exercice.map(e=>[e,0])))

        let exo_map = r.get(v.language)
        // Increment all exo that was succed by this participant
        for(let exo_number=1;exo_number<=v.exercice;exo_number++)
          exo_map.set(exo_number.toString(),exo_map.get(exo_number.toString())+1)
        r.set(v.language, exo_map)
        
        return r
      },new Map())

      let data =[]
      data_as_map.forEach((v,k)=> {
        data.push( {name:k, data:[...v.values()].map(e=>Math.floor(e/all_exercice_with_numberofparticipant.get(k)*100))})
        //data.push( {name:k, data:[...v.values()].map(e=>Math.floor(e/battledev_s17.individual.length*100))})
      })
      
      // Moyenne d'exo succeed plutot qu'un pourcentage
      this.total_pourcent_by_language=data.map(e=>{
        return {
          name:e.name,
          data:Math.floor(e.data.reduce((r,v)=>r+=v,0)/all_exercice.length)
        }
      }).sort((a,b)=>b.data-a.data)

      this.series=data
    },
  }
</script>
