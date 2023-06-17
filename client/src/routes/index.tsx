import { lazy, useEffect } from 'react'

import { IonReactRouter } from '@ionic/react-router'
import { withLazyLoading } from './utils/withLazyLoading'
import { useAuth0 } from '@auth0/auth0-react'
import { createUser } from '../services/appointments.service'

const AppRoutes = withLazyLoading(lazy(() => import('./app-routes')))
const AuthRoutes = withLazyLoading(lazy(() => import('./auth-routes')))
const Routes = () => {
  const { isAuthenticated, isLoading, error, user } = useAuth0()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  // const generateUserMaster = async () => {
  //   try {
  //     const variables = {
  //       userMaster: {
  //         email: user.email,
  //         id: user.sub,
  //         name: user.name,
  //         phone: user?.phone_number || null,
  //       },
  //     }
  //     await createUser(variables)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   if (user && isAuthenticated) {
  //     generateUserMaster()
  //   }
  // }, [user, isAuthenticated])
  return (
    <IonReactRouter>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </IonReactRouter>
  )
}

export default Routes
