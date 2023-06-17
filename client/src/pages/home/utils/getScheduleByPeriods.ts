interface ScheduleItem {
  date: string
  schedules: {
    startTime: string
    endTime: string
  }[]
}

export const getScheduleByPeriods = (scheduleData: ScheduleItem[]) => {
  const scheduleByPeriods = {
    morning: { period: 'Manhã', schedules: [] },
    afternoon: { period: 'Tarde', schedules: [] },
    night: { period: 'Noite', schedules: [] },
  }

  const periodIntervals = {
    morning: { start: '08:00', end: '12:00' },
    afternoon: { start: '13:00', end: '17:00' },
    night: { start: '18:00', end: '23:00' },
  }

  scheduleData.forEach((item) => {
    item.schedules.forEach((schedule) => {
      const startTime = new Date(
        `${item.date}T${schedule.startTime}:00Z`
      ).getTime()
      const endTime = new Date(`${item.date}T${schedule.endTime}:00Z`).getTime()

      Object.entries(periodIntervals).forEach(([period, interval]) => {
        const start = new Date(`${item.date}T${interval.start}:00Z`).getTime()
        const end = new Date(`${item.date}T${interval.end}:00Z`).getTime()

        if (startTime >= start && endTime <= end) {
          scheduleByPeriods[period].schedules.push(schedule)
        }
      })
    })
  })

  return scheduleByPeriods
}
