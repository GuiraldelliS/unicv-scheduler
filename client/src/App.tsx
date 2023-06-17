import { IonApp, setupIonicReact } from '@ionic/react'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui'
import { Auth0Provider } from '@auth0/auth0-react'

import Routes from './routes'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import './styles/global.css'
import { AlertContextProvider } from './contexts/AlertContext'
import { LightTheme } from './themes/light-theme'
import { styletron } from './styletron'
import { CLIENT_ID_AUTH, DOMAIN_AUTH } from './config/constants'

setupIonicReact()

const StyleContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>{children}</BaseProvider>
    </StyletronProvider>
  )
}
const App: React.FC = () => (
  <IonApp>
    <StyleContextProviders>
      <Auth0Provider
        domain={DOMAIN_AUTH}
        clientId={CLIENT_ID_AUTH}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
        <AlertContextProvider>
          <Routes />
        </AlertContextProvider>
      </Auth0Provider>
    </StyleContextProviders>
  </IonApp>
)

export default App
