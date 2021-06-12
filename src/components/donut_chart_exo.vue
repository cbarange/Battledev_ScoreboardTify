<template>
  <div class="donut_chart_exo">

    <apexchart type="donut" width="380" :options="chartOptions" :series="series" />
    
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import battledev2021_score from '../../public/static/battledev2021Juin_score.json'  

  export default {
    name:'donut_chart_exo',
    components: { apexchart: VueApexCharts, },
    data: () => {
      return {
        score:battledev2021_score,
        series: [44, 55, 13, 43, 22],
        chartOptions: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          title: { text: `Pie Saison ${battledev2021_score.edition}: Réussite Exo` },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
    },
    created:function(){
      let converted_data=this.score.individual.reduce((r,v)=>{
        r.label[parseInt(v.exercice)-1]=`Exo ${v.exercice}`
        r.serie[parseInt(v.exercice)-1]=r.serie[parseInt(v.exercice)-1]?r.serie[parseInt(v.exercice)-1]+1:1
        return r
      },{serie:[],label:[]})
      this.chartOptions={...this.chartOptions, labels:converted_data.label}
      this.series=converted_data.serie
    },
  }
</script>
