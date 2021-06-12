<template>
  <div class="heatmap_chart_exo">

    <apexchart type="heatmap" height="350" :options="chartOptions" :series="series" />

  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import battledev2021_score from '../../public/static/battledev2021Juin_score.json'  

  export default {
    name:'heatmap_chart_exo',
    components: { apexchart: VueApexCharts},
    data: () => {
      return {
        series: [{
          name: 'Metric1',
          data: [{x:'1',y:10},{x:'2',y:2},{x:'3',y:20}]
        },
        {
          name: 'Metric2',
          data: [{x:'1',y:3},{x:'2',y:4},{x:'3',y:7}]
        },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'heatmap',
          },
          dataLabels: {
            enabled: true,
            style: { colors: ['#999', '#999'] },
            formatter: value => value?value:''
          },
          colors: ["#0054EF"],
          title: { text: `HeatMap Saison ${battledev2021_score.edition}: Dernier Exo validé/temps` },
          xaxis:{labels: {rotate: -45,rotateAlways: true}}
        }


        // series: [{ name: 'TEAM 1', data: battledev2021_score.individual.map(e=>[new Date(`2021-06-06T${e.last_answer_time}`).getTime(),parseInt(e.exercice)]) }
        // //,{ name: 'TEAM 2', data: [[new Date('11 Feb 2017 GMT').getTime() ,6]] }
        // ],
        // chartOptions: {
        //   chart: { height: 350, type: 'scatter', zoom: { type: 'xy' } },
        //   dataLabels: { enabled: false },
        //   grid: { xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } }, },
        //   xaxis: { type: 'datetime', },
        //   yaxis: { max: 7 }
        // },
      }
    },
    
    methods:{
      hour_display:function(milliseconds_diff, without_second=false){
        let diff = {}                           // Initialisation du retour
        milliseconds_diff = Math.floor(milliseconds_diff/1000)             // Nombre de secondes entre les 2 dates
        diff.sec = milliseconds_diff % 60                   // Extraction du nombre de secondes
        milliseconds_diff = Math.floor((milliseconds_diff-diff.sec)/60)    // Nombre de minutes (partie entière)
        diff.min = milliseconds_diff % 60                    // Extraction du nombre de minutes 
        milliseconds_diff = Math.floor((milliseconds_diff-diff.min)/60)    // Nombre d'heures (entières)
        diff.hour = milliseconds_diff % 24                   // Extraction du nombre d'heures
        milliseconds_diff = Math.floor((milliseconds_diff-diff.hour)/24)   // Nombre de jours restants
        diff.day = milliseconds_diff
        return without_second?diff.hour?`${diff.hour}h${diff.min}m`:`${diff.min}m`:`${diff.hour}h${diff.min}m${diff.sec}s`
      }
    },
    created:function(){
      // get min and max last answer time hour
      let last_answer_time_min_max = battledev2021_score.individual.reduce((r,v)=> {         
        if(v.last_answer_time<r[0] || !r[0])
          r[0]=v.last_answer_time
        if(v.last_answer_time>r[1] || !r[1])
          r[1]=v.last_answer_time
        return r  
      },[])

      // Get time unit for 30 different interval
      let last_answer_time_min_max_diff = new Date(`1970-01-01T${last_answer_time_min_max[1]}`).getTime()-new Date(`1970-01-01T${last_answer_time_min_max[0]}`).getTime()
      let total_duration = this.hour_display(last_answer_time_min_max_diff)
      this.chartOptions.title.text+=`, Durée total ${total_duration}`
      const legend_time_unit_millisecond = Math.floor(last_answer_time_min_max_diff / 30)

      // Feed reducer with Metric name and fill data with 0 y value (needed apexchart use fully data array, otherwise css will broke)
      let reducer_prepared = battledev2021_score.individual.reduce((r,v)=>{        
        let empty_date_for_metric = []
        for(let i=0;i<31;i++)
          empty_date_for_metric.push({x:this.hour_display(Math.floor(legend_time_unit_millisecond*i),true),y:0})
        //empty_date_for_metric.push({x:`${Math.floor(legend_time_unit_millisecond*i/1000/60)}m`,y:0})
        if(!r[parseInt(v.exercice)-1])
          r[parseInt(v.exercice)-1] = {name:`Exo ${v.exercice}`,data:empty_date_for_metric}
        return r
      },[])

      const data = battledev2021_score.individual.reduce((r,v)=>{
        let last_answer_time_interval = Math.floor((new Date(`1970-01-01T${v.last_answer_time}`).getTime()-new Date(`1970-01-01T${last_answer_time_min_max[0]}`).getTime())/legend_time_unit_millisecond)
        
        //let last_answer_time_minute = `${Math.floor(last_answer_time_interval*legend_time_unit_millisecond/1000/60)}m`
        let last_answer_time_minute = this.hour_display(Math.floor(last_answer_time_interval*legend_time_unit_millisecond),true)
        r[parseInt(v.exercice)-1].data.find(e=>e.x==last_answer_time_minute).y++

        /*if(r[parseInt(v.exercice)-1]){
          let existing_element = r[parseInt(v.exercice)-1].data.find(e=>e.x==last_answer_time_minute)
          if(existing_element)
            existing_element.y++
          else
            r[parseInt(v.exercice)-1].data.push({x:last_answer_time_minute,y:1})
        } else*/
        return r
      },reducer_prepared)
      this.series=data      
    },
  }
</script>
