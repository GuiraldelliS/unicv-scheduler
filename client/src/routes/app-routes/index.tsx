import { lazy } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { withLazyLoading } from '../utils/withLazyLoading'

const Home = withLazyLoading(lazy(() => import('../../pages/home')))
const Schedule = withLazyLoading(lazy(() => import('../../pages/schedule')))
const Profile = withLazyLoading(lazy(() => import('../../pages/profile')))

const AppRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route exact path='/'>
        <Redirect to='/home' />
      </Route>
      <Route path='/schedule'>
        <Schedule />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </IonRouterOutlet>
  )
}

export default AppRoutes
