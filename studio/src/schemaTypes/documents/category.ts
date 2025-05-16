import {Rule, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {PropertyFilterInput} from '../../components/product-filter'

export default {
  name: 'category',
  title: 'Danh mục',
  type: 'document',
  icon: TagIcon,
  fields: [
    {
      name: 'title',
      title: 'Tên danh mục',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Link',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'parent',
      title: 'Danh mục cha',
      type: 'reference',
      to: [{type: 'category'}],
      // This makes it possible to create a hierarchy
    },
    // {
    //   name: 'properties',
    //   title: 'Category Properties',
    //   description: 'Properties that can be used to filter products in this category',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'property'}],
    //     },
    //   ],
    // },
    {
      title: 'Hình ảnh',
      name: 'image',
      description: 'Hãy chọn hình ảnh có kích thước 950 × 350',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: 'filterValues',
    //   title: 'Filter Values',
    //   description: 'Values that can be used for filtering (comma-separated for multiple values)',
    //   type: 'array',
    //   components: {
    //     input: PropertyFilterInput,
    //   },
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         {
    //           name: 'propertyName',
    //           title: 'Tên thuộc tính',
    //           // description: 'Comma-separated list of values (e.g., "Red, Blue, Green")',
    //           type: 'string',
    //           validation: (Rule: Rule) => Rule.required(),
    //         },
    //         {
    //           name: 'values',
    //           title: 'Filter Values',
    //           description: 'Comma-separated list of values (e.g., "Red, Blue, Green")',
    //           type: 'string',
    //           validation: (Rule: Rule) => Rule.required(),
    //         },
    //       ],
    //       // preview: {
    //       //     select: {
    //       //         propertyName: "property.name",
    //       //         values: "values",
    //       //     },
    //       //     prepare({ propertyName, values }: { propertyName?: string; values?: string }) {
    //       //         return {
    //       //             title: propertyName || "Property",
    //       //             subtitle: values || "No values",
    //       //         }
    //       //     },
    //       // },
    //     },
    //   ],
    // },
  ],
}
