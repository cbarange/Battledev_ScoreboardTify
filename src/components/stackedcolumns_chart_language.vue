<template>
  <div class="stackedcolumns_chart_language">

    <apexchart type="bar" height="550" :options="chartOptions" :series="series" />    
    
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  

  import battledev_s6 from '../../public/static/battledev2015Nov_score.json'  
  import battledev_s9 from '../../public/static/battledev2017Mars_score.json'  
  import battledev_s10 from '../../public/static/battledev2017Nov_score.json'  
  import battledev_s11 from '../../public/static/battledev2018Mars_score.json'  
  import battledev_s12 from '../../public/static/battledev2018Nov_score.json'  
  import battledev_s13 from '../../public/static/battledev2019Mars_score.json'  
  import battledev_s14 from '../../public/static/battledev2019Nov_score.json'  
  import battledev_s15 from '../../public/static/battledev2020Mars_score.json'  
  import battledev_s16 from '../../public/static/battledev2020Nov_score.json'  
  import battledev_s17 from '../../public/static/battledev2021Juin_score.json'  

  export default {
    name:'stackedcolumns_chart_language',
    components: { apexchart: VueApexCharts},
    data: () => {
      return {
        series: [
        /*{ name: 'PRODUCT A', data: [44, 55, 41, 67, 22, 43, 21, 49] }
        ,{ name: 'PRODUCT B', data: [13, 23, 20, 8, 13, 27, 33, 12] }
        ,{ name: 'PRODUCT C', data: [11, 17, 15, 15, 21, 14, 15, 13] }*/
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          title: { text: `Stacked Columns: Répartition des langages par saison` },
          xaxis: {
            // categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4' ],
            categories: [ '2015 S6','2017 S9','2017 S10','2018 S11','2018 S12',['2019 S13','INCOMPLET'],['2019 S14','INCOMPLET'],['2020 S15','INCOMPLET'],'2020 S16','2021 S17']
          },
          fill: {
            opacity: 1
          },
          colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#2E93fA', '#66DA26', '#546E7A', '#FF9800', '#F44336', '#E91E63', '#9C27B0'],
          /*
          P3 #008FFB
          c++ #00E396
          java #FEB019
          PHP #FF4560
          C# #775DD0
          Ruby #2E93fA
          C #66DA26
          Node #546E7A
          scala #FF9800
          GO #F44336
          kotlin #E91E63
          swift #9C27B0
          */

          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50
          },
        }
      }
    },
    
    methods:{

    },
    created:function(){
      let all_score = [battledev_s6, battledev_s9, battledev_s10, battledev_s11, battledev_s12, battledev_s13, battledev_s14, battledev_s15, battledev_s16, battledev_s17]
      
      // let all_language = all_score.reduce((r,v)=>(e=> Set(e.individual.reduce((r,v)=>r.add(v.language),new Set())),new Set())
      let all_language = all_score.map(e=>Array.from(e.individual.reduce((r,v)=>r.add(v.language),new Set())))
      all_language = ([...new Set(all_language.flat(1))])

      let data_as_map = all_language.map(e=>{
        return {
          name:e,
          data:all_score.reduce((r,v)=>r.set(`S${v.edition}`,0),new Map())
        }
      })
      
      
      all_score.forEach(e=>{
        e.individual.forEach(indiv=>{
          let element = data_as_map.find(e2=>e2.name==indiv.language)          
          element.data.set(`S${e.edition}`,element.data.get(`S${e.edition}`)+1)
        })
      })

      let data = data_as_map.map(e=>{
        return {...e, data:[...e.data.values()]}
      })
      this.series=data
    },
  }
</script>
