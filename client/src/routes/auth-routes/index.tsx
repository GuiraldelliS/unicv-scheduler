import { lazy } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { withLazyLoading } from '../utils/withLazyLoading'

const Login = withLazyLoading(
  lazy(() => import('../../pages/auth/login' as any))
)
const Register = withLazyLoading(
  lazy(() => import('../../pages/auth/register'))
)
const SplashScreen = withLazyLoading(
  lazy(() => import('../../pages/auth/splashScreen'))
)

const AuthRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <SplashScreen />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
    </IonRouterOutlet>
  )
}

export default AuthRoutes
