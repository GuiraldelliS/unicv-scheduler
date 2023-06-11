import { useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'

import Header from '../../components/layout/Header'
import WeeklyCalendar from './components/WeeklyCalendar'
import CardAppointments from './components/CardAppointments'
import { Block } from 'baseui/block'

const Schedule: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <WeeklyCalendar />
        <Block
          paddingLeft='0.5rem'
          paddingRight='0.5rem'
          paddingTop='1rem'
          paddingBottom='1rem'>
          <Block display='flex' flexDirection='column' gridRowGap='1rem'>
            {[1, 2, 3, 4, 5].map((item) => (
              <CardAppointments status='PENDING' />
            ))}
          </Block>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default Schedule
