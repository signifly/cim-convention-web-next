import { ContactCardBlockRecord } from '@/types/generated'

export function ContactCardBlock(props: ContactCardBlockRecord) {
  let { name, phone, email, description } = props
  return (
    <div className=" rounded bg-white p-6">
      <p>{name}</p>
      <div dangerouslySetInnerHTML={{ __html: description || '' }}></div>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  )
}
