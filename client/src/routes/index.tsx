import React, { lazy } from 'react'

import { IonReactRouter } from '@ionic/react-router'
import { withLazyLoading } from './utils/withLazyLoading'

const AppRoutes = withLazyLoading(lazy(() => import('./app-routes')))
const AuthRoutes = withLazyLoading(lazy(() => import('./auth-routes')))
const Routes = () => {
  const isAuth = true
  return (
    <IonReactRouter>{isAuth ? <AppRoutes /> : <AuthRoutes />}</IonReactRouter>
  )
}

export default Routes
