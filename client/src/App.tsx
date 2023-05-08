import { IonApp, setupIonicReact } from '@ionic/react'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui'

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
      <AlertContextProvider>
        <Routes />
      </AlertContextProvider>
    </StyleContextProviders>
  </IonApp>
)

export default App
