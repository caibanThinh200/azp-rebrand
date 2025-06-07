export const categoryWithParentTemplate = {
  id: 'category-with-parent',
  title: 'Category with Parent',
  description: 'Create a new category with a pre-selected parent',
  schemaType: 'category',
  parameters: [
    {
      name: 'parentId',
      title: 'Parent Category ID',
      type: 'string',
    },
  ],
  value: (params: {parentId: string}) => ({
    parent: {
      _type: 'reference',
      _ref: params.parentId,
    },
  }),
}
