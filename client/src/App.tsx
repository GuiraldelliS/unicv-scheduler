import { IonApp, setupIonicReact } from '@ionic/react'

import Routes from './routes'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import GlobalStyle from './theme/global'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <GlobalStyle />
    <Routes />
  </IonApp>
)

export default App
