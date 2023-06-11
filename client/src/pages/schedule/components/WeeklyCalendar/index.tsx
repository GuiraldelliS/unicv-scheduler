import { Block } from 'baseui/block'
import { useState } from 'react'
import { Heading, Paragraph } from '../../../../components/ui/Typography'
import { Button } from 'baseui/button'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const WeeklyCalendar = ({
  handleClickDay,
}: {
  handleClickDay: (day: Date) => void
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate)
    previousWeek.setDate(previousWeek.getDate() - 7)
    setCurrentDate(previousWeek)
  }

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setCurrentDate(nextWeek)
  }

  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(date.getDate() + i)
    weekDates.push(date)
  }

  const isSelectedDay = (index: number) => {
    return weekDates[index].getDate() === selectedDay.getDate()
  }

  const handleSelectDay = (date: Date) => {
    const selectedDay = new Date(date)
    setSelectedDay(selectedDay)
    handleClickDay(selectedDay)
    return selectedDay
  }

  return (
    <Block display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Block
        width='100%'
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        paddingLeft={'0.5rem'}
        paddingRight={'0.5rem'}
        justifyContent='space-between'>
        <Heading.XSmall color='#DA973C' textTransform='capitalize'>
          {weekDates[0].toLocaleString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </Heading.XSmall>
        <Block display='flex' alignItems='center' gridColumnGap='2px'>
          <Button
            kind='tertiary'
            size='mini'
            shape='circle'
            onClick={goToPreviousWeek}>
            <MdKeyboardArrowLeft size='20' />
          </Button>
          <Heading.XSmall color='#DA973C' textTransform='capitalize'>
            {selectedDay.toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
            })}
          </Heading.XSmall>
          <Button
            kind='tertiary'
            size='mini'
            shape='circle'
            onClick={goToNextWeek}>
            <MdKeyboardArrowRight size='20' />
          </Button>
        </Block>
      </Block>
      <Block
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        width={'100%'}>
        {daysOfWeek.map((day, index) => (
          <Block
            key={index}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}>
            <Heading.Small
              paddingBottom={'0.5rem'}
              paddingTop={'0.5rem'}
              paddingLeft={'1rem'}
              paddingRight={'1rem'}>
              {day}
            </Heading.Small>
            <Button
              kind='tertiary'
              size='mini'
              shape='square'
              onClick={() => handleSelectDay(weekDates[index])}>
              <Paragraph.XSmall
                paddingBottom={'0.5rem'}
                paddingTop={'0.5rem'}
                paddingLeft={'1rem'}
                paddingRight={'1rem'}
                backgroundColor={
                  isSelectedDay(index) ? '#f2f2f2' : 'transparent'
                }
                overrides={{
                  Block: {
                    style: {
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    },
                  },
                }}
                color={isSelectedDay(index) ? 'green' : 'black'}>
                {weekDates[index].getDate()}
              </Paragraph.XSmall>
            </Button>
          </Block>
        ))}
      </Block>
    </Block>
  )
}

export default WeeklyCalendar
