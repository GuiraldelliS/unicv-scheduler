import { IonSpinner } from '@ionic/react'
import React, { Suspense } from 'react'

export const withLazyLoading = (
  Component: React.LazyExoticComponent<(props?: any) => any>
) => {
  const LazyComponent = (props: any = {}) => {
    return (
      <Suspense
        fallback={
          <>
            <IonSpinner name='lines-sharp-small' />
          </>
        }>
        <Component {...props} />
      </Suspense>
    )
  }
  return LazyComponent
}
