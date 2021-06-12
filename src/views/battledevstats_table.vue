<template>
  <div class="battledevstats_table">
    
  <v-tabs v-model="currentTab" fixed-tabs background-color="indigo" dark >
    <v-tab>Entreprises</v-tab>
    <v-tab>Écoles</v-tab>
  </v-tabs>
  
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <score_table :headers="headers_enterprise_school" :items="data_enterprise" items_per_page="200"/>
      </v-tab-item>
      <v-tab-item>
        <score_table :headers="headers_enterprise_school" :items="data_school" items_per_page="200"/>
      </v-tab-item>
    </v-tabs-items>  

    
    
    
  </div>
</template>

<script>
  import score_table from '../components/score_table'    
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
    name:'battledevstats_table',
    components: { score_table},
    data: () => {
      return {
        data_school:[],
        data_enterprise:[],
        currentTab:'',   
        headers_enterprise_school: [
          { text: 'Rang',  align: 'center', filterable: false, value: 'rank', },
          { text: 'Nom', align: 'center', value: 'name' },
          { text: 'Score', align: 'center', value: 'score' },
          { text: 'no_participation', align: 'center', value: 'no_participation' },
          { text: 'no_member_participation', align: 'center', value: 'no_member_participation' }
        ],
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


      data_as_map = all_score_by_season.reduce((r,v)=> {
        
        // [...v.company.entries()].forEach( ([k,v])=>r.company.set(k,r.company.get(k)?r.company.get(k)+v:v) )

        [...v.company.entries()].forEach( ([k,v])=> {
          let company = r.company.get(k)

          let no_member_participation = company?company.no_member_participation+v.no_participation:v.no_participation
          let score = company?company.score+v.score:v.score

          r.company.set(k, {no_member_participation: no_member_participation, score: score, no_participation: company?company.no_participation+1:1  } )
        })

        return r
      }, data_as_map)

      //[x,y,size]

      let data_school =[]      
      data_as_map.school.forEach((v,k)=> {
        // data_school.push( {name:k, data:[[v.no_member_participation,v.score,v.no_participation]]})
        data_school.push( {name:k, no_participation:v.no_participation,score:v.score,no_member_participation:v.no_member_participation})
      })

      let data_enterprise =[]      
      data_as_map.company.forEach((v,k)=> {
        // data_enterprise.push( {name:k, data:[[v.no_member_participation,v.score,v.no_participation]]})
        data_enterprise.push( {name:k, no_participation:v.no_participation,score:v.score,no_member_participation:v.no_member_participation})
      })

      
      this.data_school=data_school.sort((a,b)=>b.score-a.score).map((e,i)=>{
        return {...e, rank:i+1}
      })      

      this.data_enterprise=data_enterprise.sort((a,b)=>b.score-a.score).map((e,i)=>{
        return {...e, rank:i+1}
      })      

    },
  }
</script>
