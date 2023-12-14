import {
  TestimonialsBlockRecord,
  TestimonialsBlockTestimonialRecord,
} from '@/types/generated'
import React, { ComponentPropsWithoutRef } from 'react'

const TestimonialCard = (
  props: TestimonialsBlockTestimonialRecord &
    ComponentPropsWithoutRef<'li'> & {
      first?: boolean
      last?: boolean
      duplicateItem?: TestimonialsBlockTestimonialRecord
    },
) => {
  const { quote, author, company } = props

  return (
    <li className="relative min-w-full snap-center lg:min-w-[700px]">
      <div className="rounded-lg bg-white p-4 text-brand-grey-950">
        <blockquote className="container mx-auto text-16">
          <p className="mb-4 ">{quote}</p>
          <cite className="not-italic">
            <p className="text-16/[140%] font-semibold tracking-[-0.08px]">
              {author}
            </p>
            <p className="text-brand-grey-600">{company}</p>
          </cite>
        </blockquote>
      </div>
    </li>
  )
}

export const TestimonialsBlock = (props: TestimonialsBlockRecord) => {
  const { anchorId, headline, textToHighlight, testimonials } = props
  const headlineText =
    typeof textToHighlight === 'string'
      ? headline.replace(
          textToHighlight,
          `<span class="bg-brand-gradient bg-clip-text text-transparent">${textToHighlight}</span>`,
        )
      : headline

  const firstIndex = 0
  const lastIndex = testimonials.length - 1

  return (
    <section
      id={anchorId || undefined}
      className="mx-auto w-screen bg-brand-grey-100 py-8 text-center"
    >
      <h2
        dangerouslySetInnerHTML={{ __html: headlineText }}
        className="container mx-auto text-20/[140%] font-semibold tracking-[-0.1px]"
      />
      <ul className="snap-gap-x-4 relative flex w-screen snap-x snap-mandatory space-x-3 overflow-x-scroll px-6 py-8">
        {testimonials.map((each, i) => (
          <TestimonialCard
            key={each.id}
            {...each}
            first={i === firstIndex}
            last={i === lastIndex}
            duplicateItem={
              i === firstIndex
                ? testimonials[lastIndex]
                : testimonials[firstIndex]
            }
          />
        ))}
      </ul>
    </section>
  )
}
