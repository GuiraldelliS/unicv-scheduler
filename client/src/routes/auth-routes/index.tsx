import { lazy } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { withLazyLoading } from '../utils/withLazyLoading'

const SplashScreen = withLazyLoading(
  lazy(() => import('../../pages/auth/splashScreen'))
)

const AuthRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path='/'>
        <SplashScreen />
      </Route>
    </IonRouterOutlet>
  )
}

export default AuthRoutes
