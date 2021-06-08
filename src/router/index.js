import Vue from 'vue'
import VueRouter from 'vue-router'


//import home from '../views/home'
import battledev20XX from '../views/battledev20XX'
import battledev2015_novembre from '../views/battledev2015_novembre'
import battledev2016_novembre from '../views/battledev2016_novembre'
import battledev2016_mars from '../views/battledev2016_mars'
import battledev2017_novembre from '../views/battledev2017_novembre'
import battledev2017_mars from '../views/battledev2017_mars'
import battledev2018_novembre from '../views/battledev2018_novembre'
import battledev2018_mars from '../views/battledev2018_mars'
import battledev2019_novembre from '../views/battledev2019_novembre'
import battledev2019_mars from '../views/battledev2019_mars'
import battledev2020_novembre from '../views/battledev2020_novembre'
import battledev2020_mars from '../views/battledev2020_mars'
import battledev2021_juin from '../views/battledev2021_juin'

Vue.use(VueRouter)

const routes = [  
  { path: '/', name: 'battledev20XX', component: battledev20XX },
  { path: '/20XX', name: 'battledev20XX', component: battledev20XX },
  
  { path: '/novembre-2015', name: 'battledev2015_novembre', component: battledev2015_novembre },
  
  { path: '/novembre-2016', name: 'battledev2016_novembre', component: battledev2016_novembre },
  { path: '/mars-2016', name: 'battledev2016_mars', component: battledev2016_mars },

  { path: '/novembre-2017', name: 'battledev2017_novembre', component: battledev2017_novembre },
  { path: '/mars-2017', name: 'battledev2017_mars', component: battledev2017_mars },

  { path: '/novembre-2018', name: 'battledev2018_novembre', component: battledev2018_novembre },
  { path: '/mars-2018', name: 'battledev2018_mars', component: battledev2018_mars },

  { path: '/novembre-2019', name: 'battledev2019_novembre', component: battledev2019_novembre },
  { path: '/mars-2019', name: 'battledev2019_mars', component: battledev2019_mars },

  { path: '/novembre-2020', name: 'battledev2020_novembre', component: battledev2020_novembre },
  { path: '/mars-2020', name: 'battledev2020_mars', component: battledev2020_mars },

  { path: '/juin-2021', name: 'battledev2021_juin', component: battledev2021_juin }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router