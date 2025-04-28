import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Trang',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    select: {
      title: 'name',
    },
    prepare(val) {
      return {
        title: val?.title,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    // defineField({
    //   name: 'heading',
    //   title: 'Heading',
    //   type: 'string',
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: 'subheading',
    //   title: 'Subheading',
    //   type: 'string',
    // }),
    {
      name: 'pageBuilder',
      type: 'array',
      // icon: ComponentIcon as any,
      title: 'Page builder',
      of: [
        {
          title: 'Banner',
          name: 'heroSlider',
          type: 'hero',
        },
        {
          title: 'Danh mục',
          name: 'gridCard',
          type: 'gridCard',
        },
        {
          title: 'Danh sách sản phẩm dạng trượt',
          name: 'productSwiper',
          type: 'productSwiper',
        },
        {
          title: 'Danh sách sản phẩm',
          name: 'productListing',
          type: 'productListing',
        },
        {
          title: 'Quote',
          name: 'quote',
          type: 'quote',
        },
        {
          title: 'Quy trình',
          name: 'processStep',
          type: 'processStep',
        },
        {
          title: 'Form liên hệ',
          name: 'contactForm',
          type: 'contactForm',
        },
        {
          title: 'Map',
          name: 'map',
          type: 'map',
        },
        {
          title: 'Chủ đề bài viết',
          name: 'blogContent',
          type: 'blogContent',
        },
        {
          title: 'Giỏ hàng',
          name: 'shoppingCart',
          type: 'shoppingCart',
        },
      ],
    },
  ],
})
