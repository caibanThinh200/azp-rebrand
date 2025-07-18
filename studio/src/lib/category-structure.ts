import {
  AddIcon,
  DocumentIcon,
  DragHandleIcon,
  EditIcon,
  FolderIcon,
  PackageIcon,
  TagIcon,
} from '@sanity/icons'
import {StructureBuilder, StructureResolver} from 'sanity/structure'
import {DraggableCategoryList} from '../components/draggable-category-list'

// Helper function to build category tree structure
export const buildCategoryStructure = async (
  client: any,
  S: StructureBuilder,
  parentId?: string,
): Promise<any[]> => {
  const query = parentId
    ? `*[_type == "category" && parent._ref == $parentId] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        "childrenCount": count(*[_type == "category" && parent._ref == ^._id]),
        "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
        "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
      }`
    : `*[_type == "category" && !defined(parent)] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        "childrenCount": count(*[_type == "category" && parent._ref == ^._id]),
        "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
        "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
      }`

  const categories = await client.fetch(query, parentId ? {parentId} : {})

  const createDraggableCategoryManagement = (parentId?: string, parentTitle?: string) => {
    return S.component()
      .title('Sắp xếp')
      .component(() => DraggableCategoryList({parentId, parentTitle}))
  }

  return categories.map((category: any) => {
    if (category.hasChildren) {
      // Parent category with children
      return S.listItem()
        .id(`category-${category._id}`)
        .title(`${category.title} (${category.childrenCount || 0})`)
        .icon(TagIcon)
        .child(async () => {
          const childItems = await buildCategoryStructure(client, S, category._id)
          console.log(childItems)
          return S.list()
            .title(`${category.title} (${category.childrenCount || 0})`)
            .items([
              S.listItem()
                .id(`manage-child-${category._id}`)
                .title(`Sắp xếp thứ tự danh mục con`)
                .icon(DragHandleIcon)
                .child(createDraggableCategoryManagement(category._id, category.title)),
              // Edit this category
              S.listItem()
                .id(`edit-category-${category._id}`)
                .title(`Chỉnh sửa "${category.title}"`)
                .icon(EditIcon)
                .child(S.document().documentId(category._id).schemaType('category')),
              S.listItem()
                .id(`create-child-${Date.now()}`)
                .title(`Tạo danh mục con`)
                .icon(AddIcon)
                .child(
                  S.document()
                    .schemaType('category')
                    // .documentId(`category-${category._id}-new-child`)
                    .initialValueTemplate('category-with-parent', {parentId: category._id}),
                ),
              // Divider
              S.divider(),
              // Child categories
              ...childItems,

              // Products in this category only
              // S.listItem()
              //   .id(`products-direct-${category._id}`)
              //   .title(`Sản phẩm thuộc "${category.title}" only`)
              //   .icon(PackageIcon)
              //   .child(
              //     S.documentList()
              //       .title(`Sản phẩm thuộc ${category.title}`)
              //       .schemaType('product')
              //       .filter(`_type == "product" && $categoryId in categories[]._ref`)
              //       .params({categoryId: category._id})
              //       .defaultOrdering([{field: 'title', direction: 'asc'}]),
              //   ),

              // Products in this category and all subcategories
              // S.listItem()
              //   .id(`products-all-${category._id}`)
              //   .title(`Sản phẩm bao gòm của danh mục con`)
              //   .icon(PackageIcon)
              //   .child(
              //     S.documentList()
              //       .title(`All products in ${category.title} tree`)
              //       .schemaType('product')
              //       .filter(
              //         `_type == "product" && (
              //           $categoryId in categories[]._ref ||
              //           count(categories[_ref in *[_type == "category" && parent._ref == $categoryId]._id]) > 0
              //         )`,
              //       )
              //       .params({categoryId: category._id})
              //       .defaultOrdering([{field: 'title', direction: 'asc'}]),
              //   ),

              // Divider
              // S.divider(),
            ])
        })
    } else {
      // Leaf category without children
      return S.listItem()
        .id(`category-leaf-${category._id?.replace('drafts.', '')}`)
        .title(`${category.title} (${category.childrenCount || 0})`)
        .icon(TagIcon)
        .child(
          S.list()
            .title(`${category.title}`)
            .items([
              S.listItem()
                .id(`manage-children-${category._id}`)
                .title(`Sắp xếp thứ tự danh mục con`)
                .icon(DragHandleIcon)
                .child(createDraggableCategoryManagement(category._id, category.title)),
              // Edit this category
              S.listItem()
                .id(`create-child-${Date.now()}`)
                .title(`Tạo danh mục con`)
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('category')
                    // .documentId(`category-${category._id}-new-child}`)
                    .initialValueTemplate('category-with-parent', {parentId: category._id}),
                ),
              S.listItem()
                .id(`edit-leaf-category-${category._id?.replace('drafts.', '')}`)
                .title(`Chỉnh sửa "${category.title}"`)
                .icon(DocumentIcon)
                .child(
                  S.document()
                    .documentId(category._id?.replace('drafts.', ''))
                    .schemaType('category'),
                ),

              // Divider
              S.divider(),

              // Products in this category
              // S.listItem()
              //   .id(`products-leaf-${category._id}`)
              //   .title(`Sản phẩm thuộc "${category.title}"`)
              //   .icon(PackageIcon)
              //   .child(
              //     S.documentList()
              //       .title(`Sản phẩm thuộc ${category.title}`)
              //       .schemaType('product')
              //       .filter(`_type == "product" && $categoryId in categories[]._ref`)
              //       .params({categoryId: category._id})
              //       .defaultOrdering([{field: 'title', direction: 'asc'}]),
              //   ),
            ]),
        )
    }
  })
}
