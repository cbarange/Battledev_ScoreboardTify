<template>
  <v-app>
    <v-app-bar
    app
    color="primary"
    dark
    >
    <div class="d-flex align-center">
      <a href="https://vuetifyjs.com/en/">
        <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
        />
      </a>
      <a href="https://battledev.blogdumoderateur.com/">
        <v-img
        alt="BattleDev Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="./assets/logo-battledev.svg"
        width="100"
        />
      </a>
    </div>
    <v-spacer></v-spacer>

    <v-card max-width="65%">
    <v-tabs center-active dark >
      <v-tab @click="$router.push('/20XX')">20XX</v-tab>
      <v-tab @click="$router.push('/2015')">2015</v-tab>
      <v-tab @click="$router.push('/novembre-2016')">Nov 2016</v-tab>
      <v-tab @click="$router.push('/mars-2016')">Mars 2016</v-tab>
      <v-tab @click="$router.push('/2017')">2017</v-tab>
      <v-tab @click="$router.push('/mars-2018')">Mars 2018</v-tab>
      <v-tab @click="$router.push('/novembre-2018')">Nov 2018</v-tab>
      <v-tab @click="$router.push('/2019')">2019</v-tab>
      <v-tab @click="$router.push('/2020')">2020</v-tab>
      <v-tab @click="$router.push('/2021')">2021</v-tab>
    </v-tabs>
    </v-card>
    
    
    

    <v-spacer></v-spacer>

    <v-btn text @click="$vuetify.theme.dark=!$vuetify.theme.dark">
      <!-- <div :style="`transform: scaleX(${theme});`"> -->
        <img src="./assets/theme_switcher.svg"/>
      <!-- </div> -->
    </v-btn>

    <v-btn href="https://github.com/cbarange/Battledev_ScoreboardTify" target="_blank" text>
    <span class="mr-2">Github</span>
    <v-icon>mdi-open-in-new</v-icon>
  </v-btn>
  
</v-app-bar>

<v-main>
  <router-view/>
  
</v-main>
</v-app>
</template>

<script>
  

  export default {
    name: 'App',

    components: {
      
    },

    data: () => ({
      theme:-1,
  }),
    created: function(){
      this.$vuetify.theme.dark=true  
    }
  };
</script>

<style>

  a{
    text-decoration: none !important;
  }

  .year-btn{
    margin:0 5px;
    text-decoration: none !important; 
  }
</style>


