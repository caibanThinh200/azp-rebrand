import {useFormValue} from 'sanity'

const ReadOnly = () => {
  // console.log(document);
  const _id = useFormValue(['_id'])
  return <div style={{fontWeight: 700}}>{(_id as string)?.replace('drafts.', '').slice(0, 10)}</div>
}

export default ReadOnly
