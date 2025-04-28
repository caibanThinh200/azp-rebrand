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
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
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
