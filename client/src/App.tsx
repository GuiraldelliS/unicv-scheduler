import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Home from './pages/Home'

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
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
