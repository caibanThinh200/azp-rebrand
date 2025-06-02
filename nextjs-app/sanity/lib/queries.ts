import { defineQuery } from "groq";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getAllPages = defineQuery(`
      *[_type == 'page']
`);

export const getAllProducts = defineQuery(`
      *[_type == 'product']
`);

export const getAllCategories = defineQuery(`
      *[_type == 'category']
`);

export const getPageQuery =
  defineQuery(` *[_type == 'page' && slug.current == $slug][0]{
  _id,
  _type,
  name,
  slug,
  heading,
  subheading,
  "pageBuilder": pageBuilder[]{
    ...,
    _type == "productSwiper" => {
      ...,
      products[]-> {
        ...,
      }
    },
    _type == "gridCard" => {
      ...,
      categories[]-> {
        ...,
      }
    },
    _type == "productListing" => {
      ...,
      products[]-> {
        ...,
      }
    },
  },
}`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const getHeaderQuery = defineQuery(`
*[_type == "header"] {
  ...,
  navItems[]-> {
    ...,
  },
  categories[]-> {
    ...,
    "children": *[_type == "category" && parent._ref == ^._id] {
      _id,
      title,
      "slug": slug.current,
      "level": 2,
      "children": *[_type == "category" && parent._ref == ^._id] {
        _id,
        title,
        "slug": slug.current,
        "level": 3,
        "children": *[_type == "category" && parent._ref == ^._id] {
          _id,
          title,
          "slug": slug.current,
          "level": 4,
          "children": *[_type == "category" && parent._ref == ^._id] {
            _id,
            title,
            "slug": slug.current,
            "level": 5
          }
        }
      }
    }
}
}[0]
`);

export const rootCategories = defineQuery(`
*[_type == "category" && !defined(parent)] {
  ...,
}
`);

export const singleCategoryQuery = defineQuery(`
*[_type == "category" && slug.current == $slug] {
  ...,
}[0]
`);

export const getFooterQuery = defineQuery(`
  *[_type == "footer"] {
    ...,
    "supportColumn": supportColumn[]{
      ...,
      "post": post->,
      "page": page->,  
    }
  }[0]
`);

export const getProductsQuery = defineQuery(`
    *[_type == "product" && (
      $category in category._ref || 
      category._ref in *[_type == "category" && parent._ref == $category]._id
    )]
`);

export const searchProductQuery = defineQuery(`
  *[_type == "product" && title match "$search**"
  ]
`);

export const getPaginatedProducts = defineQuery(`
  {
    "total": count(*[_type == "product" && (
      $category in category[]._ref || 
       count(category[_ref in *[_type == "category" && parent._ref == *[_type == "category" && slug.current == $category][0]._id]._id]) > 0
    )]),
    "items": *[_type == "product" && (
      $category in category[]._ref || 
      count(category[_ref in *[_type == "category" && parent._ref == *[_type == "category" && slug.current == $category][0]._id]._id]) > 0
    )] | order(_createdAt desc) [($pageSize * ($pageNumber - 1))...($pageSize * $pageNumber)],
    "pageSize": $pageSize,
    "currentPage": $pageNumber,
    "totalPages": select(
      count(*[_type == "product"]) % $pageSize == 0 => count(*[_type == "product"]) / $pageSize,
      count(*[_type == "product"]) / $pageSize + 1
    )
  }
`);

export const getProductDetailQuery = defineQuery(`
    *[_type == "product" && slug.current == $slug] {...,}[0]
`);

export const getProperties = defineQuery(`
    *[_type == "property"]
`);
