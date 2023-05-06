import { lazy } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { withLazyLoading } from '../utils/withLazyLoading'

const Login = withLazyLoading(lazy(() => import('../../pages/auth/login')))
const Register = withLazyLoading(
  lazy(() => import('../../pages/auth/register'))
)

const AuthRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Redirect to='/login' />
      </Route>
      <Route exact path='/register'>
        <Register />
      </Route>
    </IonRouterOutlet>
  )
}

export default AuthRoutes
