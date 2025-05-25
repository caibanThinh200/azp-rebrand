import {Rule, Selection} from 'sanity'

// schemas/quote.js
export default {
  name: 'quote',
  title: 'Đoạn trích',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Đoạn trích',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'backgroundColor',
      title: 'Màu nền',
      description: 'Nhập mã màu',
      type: 'color',
    },
  ],
  preview: {
    select: {
      quote: 'quote',
    },
    prepare(selection: {quote: string}) {
      const {quote} = selection
      return {
        title: `Đoạn trích: ${quote}`,
      }
    },
  },
}
