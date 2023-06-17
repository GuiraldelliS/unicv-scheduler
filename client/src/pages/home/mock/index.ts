type TimeSlot = {
  startTime: string
  endTime: string
}

type ScheduleItem = {
  date: string
  schedules: TimeSlot[]
}

export const mockScheduleData: ScheduleItem[] = [
  {
    date: '2023-05-15',
    schedules: generateTimeSlots('08:00', '20:00', 30),
  },
]

function generateTimeSlots(
  startTime: string,
  endTime: string,
  interval: number
) {
  const timeSlots: { startTime: string; endTime: string }[] = []
  let currentTime = startTime

  while (currentTime < endTime) {
    const nextTime = addMinutes(currentTime, interval)

    timeSlots.push({ startTime: currentTime, endTime: nextTime })
    currentTime = nextTime
  }

  return timeSlots
}

function addMinutes(time: string, minutes: number): string {
  const [hours, minutesStr] = time.split(':')
  const currentMinutes = parseInt(minutesStr)

  let totalMinutes = parseInt(hours) * 60 + currentMinutes + minutes
  let newHours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0')
  let newMinutes = (totalMinutes % 60).toString().padStart(2, '0')

  return `${newHours}:${newMinutes}`
}
