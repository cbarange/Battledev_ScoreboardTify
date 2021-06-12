<template>
  <div class="battledevstats">
    <apexchart type="bubble" height="550" :options="chartOptions" :series="series" />
    <line_chart_language_exo />
    <stackedcolumns_chart_language />
    <heatmap_chart_exo />
    <donut_chart_exo />
    <!-- <apexchart type="scatter" height="350" :options="chartOptions" :series="series" /> -->
    
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import donut_chart_exo from '../components/donut_chart_exo'
  import heatmap_chart_exo from '../components/heatmap_chart_exo'
  import stackedcolumns_chart_language from '../components/stackedcolumns_chart_language'
  import line_chart_language_exo from '../components/line_chart_language_exo'

  import battledev_s6 from '../../public/static/battledev2015Nov_score.json'  
  import battledev_s7 from '../../public/static/battledev2016Mars_score.json'  
  import battledev_s8 from '../../public/static/battledev2016Nov_score.json'  
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
    name:'battledevstats',
    components: { apexchart: VueApexCharts, donut_chart_exo, heatmap_chart_exo, stackedcolumns_chart_language, line_chart_language_exo},
    data: () => {
      return {

        series: [

          { name: "SAMPLE A", data: [ [16.4, 5.4,5], [3,21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0] ] }
          ,{ name: "SAMPLE B", data: [ [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4] ] }
          ,{ name: "SAMPLE C", data: [ [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2] ]
        }],
        chartOptions: {
          chart: {
            height: 550,
            type: 'bubble',
            zoom: {
              enabled: true,
              type: 'xy'
            }
          },
          legend: { show: true,},
          dataLabels: {
            enabled: false,
            formatter: (val, opts) => opts.w.config.series[opts.seriesIndex].name ,
            style: {colors:['#333','#333']}
          },
          tooltip: {
            enabled: true,
            z: { formatter: undefined, title: 'Nombre de participations: ' }
/*            custom: function({series, seriesIndex, dataPointIndex}) {
              return '<div class="arrow_box">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>'
            }
*/
  //  div .apexcharts-tooltip-title


          },
          fill: {
            opacity: 0.8
          },
          title: {
            text: `Bubble : École taux réussite/no_participant_total, size:no_participation`
          },
          xaxis: {
            tickAmount: 10,            
            type: 'category',
            title: { text: 'Nombre de participation des membres' },
          },
          yaxis: {
            tickAmount: 7,
            // max: 70
            title: { text: 'Score SUM(1-rank/no_school)' },
            labels: { formatter: (val) => parseFloat(val).toFixed(1) },
          },
        }
      }
    },
    methods:{

    },
    created:function(){

      const format_school_company_name = str => str.toUpperCase().trim()
      let all_season = [battledev_s6,battledev_s7,battledev_s8,battledev_s9,battledev_s10,battledev_s11,battledev_s12,battledev_s13,battledev_s14,battledev_s15,battledev_s16,battledev_s17]

      // HashMap : [Entreprise, {no_participant:individual.count(entreprise), point:0}]

      let all_score_by_season = all_season.map(e=>{
        
        let company = Array.from(e.enterprise.sort((a,b)=>parseInt(a.rank)-parseInt(b.rank)).reduce((r,v)=> r.add(format_school_company_name(v.name)),new Set()))
        let school = Array.from(e.school.sort((a,b)=>parseInt(a.rank)-parseInt(b.rank)).reduce((r,v)=> r.add(format_school_company_name(v.name)),new Set()))
        

        let individual = e.individual.reduce((r,v)=>{
          // company or school equals '' or undefined do nothing
          if(!v.company_school)
            return r
          
          let company_school= format_school_company_name(v.company_school)
          r.set(company_school,r.get(company_school)?r.get(company_school)+1:1)
          return r
        },new Map())        
        

        let school_score = school.reduce((r,school_name, index, array)=> {
          let no_participation = individual.get(school_name)?individual.get(school_name):1

          return r.set(school_name,{no_participation: no_participation,score: 1 - index/array.length})
        } , new Map())
        

        let company_score = company.reduce((r,company_name, index, array)=> {
          let no_participation = individual.get(company_name)?individual.get(company_name):1

          return r.set(company_name,{no_participation: no_participation,score: 1 - index/array.length})
        } , new Map())

        return {company:company_score, school:school_score}
      })


      let data_as_map = all_score_by_season.reduce((r,v)=> {
        
        // [...v.company.entries()].forEach( ([k,v])=>r.company.set(k,r.company.get(k)?r.company.get(k)+v:v) )

        [...v.school.entries()].forEach( ([k,v])=> {
          let school = r.school.get(k)

          let no_member_participation = school?school.no_member_participation+v.no_participation:v.no_participation
          let score = school?school.score+v.score:v.score

          r.school.set(k, {no_member_participation: no_member_participation, score: score, no_participation: school?school.no_participation+1:1  } )
        })

        return r
      }, {company:new Map(), school:new Map()})

      //[x,y,size]

      let data =[]
      let max_x_y = [] // eg : [15.215, 120]
      data_as_map.school.forEach((v,k)=> {
        data.push( {name:k, data:[[v.no_member_participation,v.score,v.no_participation]]})
        // data.push( {name:k, data:[[v.no_participation,v.score,v.no_member_participation]]})

        if(max_x_y[0]<v.no_member_participation || !max_x_y[0])
          max_x_y[0]=v.no_member_participation
        if(max_x_y[1]<v.score || !max_x_y[1])
          max_x_y[1]=v.score
        
      })
      

      this.chartOptions.xaxis.max = max_x_y[0]
      this.chartOptions.yaxis.max = max_x_y[1]*1.05

      this.series=data
      console.log(data_as_map)
      

      // s17 indiv ecole entreprise
      // s15 indiv ecole entreprise
      // s14 indiv ecole entreprise
      // s13 indiv ecole
      // s12 ecole
      // s11 ecole
      // s10 ecole
      // s9 ecole
      // s8 ecole
      // s7 ecole
      // s6 ecole      


    },
  }
</script>
