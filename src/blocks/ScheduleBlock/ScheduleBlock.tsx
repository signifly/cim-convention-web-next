import React from 'react'
import { GridContainer } from '@/components/GridContainer'
import {
  ScheduleBlockRecord,
  ScheduleBlockDayRecord,
  ScheduleBlockDayTimeSlotRecord,
} from '@/types/generated'
import { useFormatter } from 'next-intl'

const AnchorLink = ({ day }: { day: ScheduleBlockDayRecord }) => {
  const format = useFormatter()
  const date = new Date(day.date)
  const monthString = format.dateTime(date, {
    month: 'long',
    timeZone: 'UTC',
  })
  const dateString = format.dateTime(date, {
    day: 'numeric',
    timeZone: 'UTC',
  })
  const weekDayString = format.dateTime(date, {
    weekday: 'long',
    timeZone: 'UTC',
  })

  return (
    <a
      href={`#${day.id}`}
      className="inline min-w-[120px] rounded border border-brand-grey-300 bg-white p-3 pt-1 font-medium"
    >
      <time dateTime={day.date} className="text-12/[100%]">
        {weekDayString}
      </time>
      <div className="text-14/[125%] text-brand-green">{`${monthString} ${dateString}`}</div>
    </a>
  )
}

const Day = ({ day }: { day: ScheduleBlockDayRecord }) => {
  const format = useFormatter()
  const date = new Date(day.date)
  const monthString = format.dateTime(date, {
    month: 'long',
    timeZone: 'UTC',
  })
  const dateString = format.dateTime(date, {
    day: 'numeric',
    timeZone: 'UTC',
  })
  const weekDayString = format.dateTime(date, {
    weekday: 'long',
    timeZone: 'UTC',
  })

  return (
    <li key={day.id} id={day.id}>
      <h2 className="mb-6 flex items-center gap-x-1 space-x-2 text-20/[140%] font-medium">
        <time dateTime={day.date}>{weekDayString}</time>
        <div className="h-[20px] border-r border-brand-grey-300" />
        <span className="text-brand-green">{`${monthString} ${dateString}`}</span>
      </h2>
      <ul className="col-span-full flex flex-col gap-y-4">
        {day.timeSlots.map((timeSlot) => (
          <TimeSlot key={timeSlot.id} timeSlot={timeSlot} />
        ))}
      </ul>
    </li>
  )
}

const TimeSlot = ({
  timeSlot,
}: {
  timeSlot: ScheduleBlockDayTimeSlotRecord
}) => {
  const format = useFormatter()
  const startTime = new Date(timeSlot.startTime)
  const endTime = new Date(timeSlot.endTime)
  const startHour = format.dateTime(startTime, {
    hour: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  })
  const endHour = format.dateTime(endTime, {
    hour: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  })
  const startMinutes = format.dateTime(startTime, {
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  })
  const endMinutes = format.dateTime(endTime, {
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  })

  // @todo: add link if there is a linkTo record
  // @todo: add support link label if there is a linkTo record
  // @todo: add hover effect if there is a linkTo record

  return (
    <li key={timeSlot.id} className="rounded bg-brand-grey-100 p-3">
      <span
        aria-label="time slot"
        className="mb-3 text-16/[125%] text-brand-grey-600"
      >
        <time dateTime={timeSlot.startTime} aria-label="from">
          {`${startHour}h${
            startMinutes.length === 1 ? '0'.concat(startMinutes) : startMinutes
          }`}
        </time>
        {' – '}
        <time dateTime={timeSlot.endTime} aria-label="to">
          {`${endHour}h${
            endMinutes.length === 1 ? '0'.concat(endMinutes) : endMinutes
          }`}
        </time>
      </span>
      <h3 className="mb-2 text-16/[150%] font-medium">{timeSlot.title}</h3>
      <p className="mb-2 text-14/[150%] font-normal text-brand-grey-600">
        {timeSlot.description}
      </p>
    </li>
  )
}

export const ScheduleBlock = (props: ScheduleBlockRecord) => {
  const { anchorId, displayAnchorLinks, days } = props

  return (
    <section id={anchorId} className="bg-brand-grey-25">
      {displayAnchorLinks && (
        <GridContainer className="inline-flex justify-start overflow-scroll py-4">
          {days.map((day) => (
            <AnchorLink key={day.id} day={day} />
          ))}
        </GridContainer>
      )}

      <GridContainer className="py-6">
        <ul className="col-span-full flex flex-col gap-y-12">
          {days.map((day) => (
            <Day key={day.id} day={day} />
          ))}
        </ul>
      </GridContainer>
    </section>
  )
}
