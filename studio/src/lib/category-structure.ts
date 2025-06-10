import {DocumentIcon, FolderIcon, PackageIcon, TagIcon} from '@sanity/icons'
import {StructureBuilder, StructureResolver} from 'sanity/structure'

// Helper function to build category tree structure
export const buildCategoryStructure = async (
  client: any,
  S: StructureBuilder,
  parentId?: string,
): Promise<any[]> => {
  const query = parentId
    ? `*[_type == "category" && parent._ref == $parentId] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        "childrenCount": count(*[_type == "category" && parent._ref == ^._id]),
        "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
        "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
      }`
    : `*[_type == "category" && !defined(parent)] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        "childrenCount": count(*[_type == "category" && parent._ref == ^._id]),
        "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
        "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
      }`

  const categories = await client.fetch(query, parentId ? {parentId} : {})

  return categories.map((category: any) => {
    if (category.hasChildren) {
      // Parent category with children
      return S.listItem()
        .id(`category-${category._id}`)
        .title(`${category.title} (${category.childrenCount || 0})`)
        .icon(TagIcon)
        .child(async () => {
          const childItems = await buildCategoryStructure(client, S, category._id)

          return S.list()
            .title(`${category.title} (${category.childrenCount || 0})`)
            .items([
              // Edit this category
              S.listItem()
                .id(`edit-category-${category._id}`)
                .title(`Chỉnh sửa "${category.title}"`)
                .icon(TagIcon)
                .child(S.document().documentId(category._id).schemaType('category')),
              S.listItem()
                .id(`create-child-${category._id}`)
                .title(`Tạo danh mục con`)
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('category')
                    .documentId(
                      `category-child-${category._id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    )
                    .initialValueTemplate('category-with-parent', {parentId: category._id}),
                ),
              // Divider
              S.divider(),

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

              // Child categories
              ...childItems,
            ])
        })
    } else {
      // Leaf category without children
      return S.listItem()
        .id(`category-leaf-${category._id}`)
        .title(`${category.title} (${category.childrenCount || 0})`)
        .icon(TagIcon)
        .child(
          S.list()
            .title(`${category.title}`)
            .items([
              // Edit this category
              S.listItem()
                .id(`create-child-${category._id}`)
                .title(`Tạo danh mục con`)
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('category')
                    .documentId(
                      `category-child-${category._id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    )
                    .initialValueTemplate('category-with-parent', {parentId: category._id}),
                ),
              S.listItem()
                .id(`edit-leaf-category-${category._id}`)
                .title(`Chỉnh sửa "${category.title}"`)
                .icon(DocumentIcon)
                .child(S.document().documentId(category._id).schemaType('category')),

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
