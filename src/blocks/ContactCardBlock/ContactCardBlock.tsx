import { ContactCardBlockRecord } from '@/types/generated'

export function ContactCardBlock(props: ContactCardBlockRecord) {
  let { name, phone, email, description } = props
  return (
    <div className=" flex flex-col gap-6 rounded bg-white p-6">
      <div className="flex flex-col items-start justify-start gap-2">
        <p className="text-16/[140%] font-semibold md:text-20/[140%]">{name}</p>
        <div
          className="text-14/[150%] text-brand-grey-600 md:text-16/[150%]"
          dangerouslySetInnerHTML={{ __html: description || '' }}
        ></div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <a
          className="text-14/[125%] font-medium text-brand-green underline md:text-16/[125%]"
          href={`mailto:${email}`}
        >
          {email}
        </a>
        <p className="text-14/[125%] font-medium text-brand-green md:text-16/[125%]">
          {phone}
        </p>
      </div>
    </div>
  )
}
