import {CommentIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const submission = defineType({
  name: 'submission',
  icon: CommentIcon,
  title: 'Liên lạc',
  type: 'document',
  readOnly: true,
  fields: [
    {name: 'name', title: 'Họ tên', type: 'string', readOnly: true},
    {name: 'email', title: 'Email', type: 'string', readOnly: true},
    {name: 'phoneNumber', title: 'SDT', type: 'string', readOnly: true},
    {name: 'companyName', title: 'SDT', type: 'string', readOnly: true},
    {name: 'message', title: 'Ghi chú', type: 'text', readOnly: true},
  ],
})
