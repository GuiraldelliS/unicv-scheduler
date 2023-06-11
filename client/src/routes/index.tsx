import { lazy } from 'react'

import { IonReactRouter } from '@ionic/react-router'
import { withLazyLoading } from './utils/withLazyLoading'
import { useAuth0 } from '@auth0/auth0-react'

const AppRoutes = withLazyLoading(lazy(() => import('./app-routes')))
const AuthRoutes = withLazyLoading(lazy(() => import('./auth-routes')))
const Routes = () => {
  const { isAuthenticated, isLoading, error } = useAuth0()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }
  return (
    <IonReactRouter>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </IonReactRouter>
  )
}

export default Routes
