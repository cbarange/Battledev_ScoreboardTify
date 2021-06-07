<template>
  <div class="score_table">
    <v-card>
    <v-card-title>
      {{title}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <!-- <v-container>
    <v-layout column style="height: 100vh">
    <v-flex md6 style="overflow: auto">   -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      item-key="rank"
      :items-per-page="parseInt(items_per_page)"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    ></v-data-table>
    <!-- </v-flex>  
    </v-layout>
  </v-container> -->
  </v-card>
  </div>
</template>

<script>

  export default {
    name:'score_table',
    props: ['title', 'headers', 'items' ,'items_per_page'],
    data: () => {
      return {
        search: '',
      }
    },
  }
</script>
