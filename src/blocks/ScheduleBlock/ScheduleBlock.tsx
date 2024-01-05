import React from 'react'
import { GridContainer } from '@/components/GridContainer'
import {
  ScheduleBlockRecord,
  ScheduleBlockDayRecord,
  ScheduleBlockDayTimeSlotRecord,
} from '@/types/generated'
import { dtf } from '@/utils/dateTimeFormat'

const AnchorLinks = ({ days }: { days: Array<ScheduleBlockDayRecord> }) => (
  <GridContainer className="inline-flex justify-start overflow-scroll py-4">
    {days.map((day, index) => {
      const format = new dtf(day.date)

      return (
        <a
          key={index}
          href={`#${day.id}`}
          className="inline min-w-[120px] rounded border border-brand-grey-300 bg-white p-3 pt-1 font-medium"
        >
          <time dateTime={day.date} className="text-12/[100%]">
            {format.getDay()}
          </time>
          <div className="text-14/[125%] text-brand-green">{`${format.getMonth()} ${format.getDate()}`}</div>
        </a>
      )
    })}
  </GridContainer>
)

const Days = ({ days }: { days: Array<ScheduleBlockDayRecord> }) => (
  <GridContainer className="py-6">
    <ul className="col-span-full">
      {days.map((day) => {
        const format = new dtf(day.date)

        return (
          <li key={day.id} id={day.id}>
            <h2 className="mb-6 flex items-center gap-x-1 space-x-2 text-20/[140%] font-medium">
              <time dateTime={day.date}>{format.getDay()}</time>
              <div className="h-[20px] border-r border-brand-grey-300" />
              <span className="text-brand-green">{`${format.getMonth()} ${format.getDate()}`}</span>
            </h2>
            <TimeSlots timeSlots={day.timeSlots} />
          </li>
        )
      })}
    </ul>
  </GridContainer>
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
      <Days days={days} />
    </section>
  )
}
