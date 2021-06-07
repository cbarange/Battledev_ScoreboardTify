import Vue from 'vue'
import VueRouter from 'vue-router'


//import home from '../views/home'
import battledev20XX from '../views/battledev20XX'
import battledev2015 from '../views/battledev2015'
import battledev2016_novembre from '../views/battledev2016_novembre'
import battledev2016_mars from '../views/battledev2016_mars'
import battledev2017 from '../views/battledev2017'
import battledev2018_novembre from '../views/battledev2018_novembre'
import battledev2018_mars from '../views/battledev2018_mars'
import battledev2019 from '../views/battledev2019'
import battledev2020 from '../views/battledev2020'
import battledev2021 from '../views/battledev2021'

Vue.use(VueRouter)

const routes = [  
  { path: '/', name: 'battledev20XX', component: battledev20XX },
  { path: '/20XX', name: 'battledev20XX', component: battledev20XX },
  { path: '/2015', name: 'battledev2015', component: battledev2015 },
  { path: '/novembre-2016', name: 'battledev2016_novembre', component: battledev2016_novembre },
  { path: '/mars-2016', name: 'battledev2016_mars', component: battledev2016_mars },
  { path: '/2017', name: 'battledev2017', component: battledev2017 },
  { path: '/mars-2018', name: 'battledev2018_mars', component: battledev2018_mars },
  { path: '/novembre-2018', name: 'battledev2018_novembre', component: battledev2018_novembre },
  { path: '/2019', name: 'battledev2019', component: battledev2019 },
  { path: '/2020', name: 'battledev2020', component: battledev2020 },
  { path: '/2021', name: 'battledev2021', component: battledev2021 },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router