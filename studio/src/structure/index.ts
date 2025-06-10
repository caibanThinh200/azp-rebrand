import {CogIcon, ComponentIcon, DocumentIcon, FolderIcon, TagIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {buildCategoryStructure} from '../lib/category-structure'
import {StructureResolverContext} from 'sanity/structure'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = [
  'settings',
  'assist.instruction.context',
  'header',
  'footer',
  'category',
  'post',
]

export const structure: StructureResolver = (
  S: StructureBuilder,
  context: StructureResolverContext,
) =>
  S.list()
    .title('Quản lí website')
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId())),
      S.listItem()
        .title('Danh mục')
        .icon(TagIcon)
        .child(async () => {
          const categories = await buildCategoryStructure(
            context.getClient({apiVersion: '2024-10-28'}),
            S,
          )
          return S.list()
            .title('Danh mục')
            .items([
              S.listItem()
                .title('Tạo danh mục')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('category')
                    .title('Danh mục mới')
                    .filter('_type == "category"')
                    .child((documentId) =>
                      S.document().documentId(documentId).schemaType('category'),
                    ),
                ),

              // Divider
              S.divider(),

              // All categories (flat view)
              S.listItem()
                .title('Tất cả Danh Mục')
                .icon(DocumentIcon)
                .child(
                  S.documentTypeList('category')
                    .title('Tất cả Danh Mục')
                    .filter('_type == "category"'),
                ),

              // Divider
              S.divider(),

              // Tree structure
              ...categories,
            ])
        }),

      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Chỉnh sửa website')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
      S.listItem()
        .title('Điều hướng')
        .child(S.document().schemaType('header').documentId('headerSettings'))
        .icon(ComponentIcon),
      S.listItem()
        .title('Chân trang')
        .child(S.document().schemaType('footer').documentId('footerSettings'))
        .icon(ComponentIcon),
    ])
