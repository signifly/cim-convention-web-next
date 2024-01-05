import React from 'react'
import { GridContainer } from '@/components/GridContainer'
import {
  ScheduleBlockRecord,
  ScheduleBlockDayRecord,
  ScheduleBlockDayTimeSlotRecord,
} from '@/types/generated'
import { dtf } from '@/utils/dateTimeFormat'

const AnchorLinks = ({ days }: { days: Array<ScheduleBlockDayRecord> }) => (
  <GridContainer className="inline-flex overflow-scroll py-4">
    {days.map((day, index) => {
      const format = new dtf(day.date)

      return (
        <a
          key={index}
          href={`#${day.id}`}
          className="inline min-w-[120px] space-y-1 rounded border border-brand-grey-300 bg-white p-3 font-medium"
        >
          <div className="text-12/[100%]">{format.getDay()}</div>
          <div className="text-14/[125%] text-brand-green">{`${format.getMonth()} ${format.getDate()}`}</div>
        </a>
      )
    })}
  </GridContainer>
)

const Days = ({ days }: { days: Array<ScheduleBlockDayRecord> }) => (
  <ul className="col-span-full">
    {days.map((day) => (
      <li key={day.id} id={day.id}>
        <h2>{day.date}</h2>
        <TimeSlots timeSlots={day.timeSlots} />
      </li>
    ))}
  </ul>
)

const TimeSlots = ({
  timeSlots,
}: {
  timeSlots: Array<ScheduleBlockDayTimeSlotRecord>
}) => (
  <ul className="col-span-full">
    {timeSlots.map((timeSlot) => (
      <li key={timeSlot.id}>
        <h3>
          {timeSlot.startTime} - {timeSlot.endTime}
        </h3>
      </li>
    ))}
  </ul>
)

export const ScheduleBlock = (props: ScheduleBlockRecord) => {
  const { anchorId, displayAnchorLinks, days } = props

  return (
    <section id={anchorId} className="bg-brand-grey-25">
      {displayAnchorLinks && <AnchorLinks days={days} />}
      <GridContainer>
        <Days days={days} />
      </GridContainer>
    </section>
  )
}
