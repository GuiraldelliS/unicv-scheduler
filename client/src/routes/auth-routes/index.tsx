import { lazy } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { withLazyLoading } from '../utils/withLazyLoading'

const Login = withLazyLoading(lazy(() => import('../../pages/auth/login')))

const AuthRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Redirect to='/login' />
      </Route>
    </IonRouterOutlet>
  )
}

export default AuthRoutes
