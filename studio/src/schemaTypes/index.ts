import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import product from './documents/product'
import category from './documents/category'
import properties from './documents/properties'
import {header} from './singletons/header'
import {footer} from './singletons/footer'
import heroSlider from './components/heroSlider'
import gridCard from './components/gridCard'
import productSwiper from './components/productSwiper'
import productListing from './components/productListing'
import quote from './components/quote'
import map from './components/map'
import contactForm from './components/contact-form'
import processStep from './components/process'
import blogContent from './components/blog-content'
import shoppingCart from './components/shoppingCart'
import {order} from './documents/order'
import {submission} from './documents/submision'
import checkoutStatus from './components/checkout-status'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  product,
  category,
  properties,
  order,
  submission,
  // Objects
  blockContent,
  infoSection,
  header,
  footer,
  // callToAction,
  link,
  // component
  heroSlider,
  gridCard,
  productSwiper,
  productListing,
  quote,
  map,
  contactForm,
  processStep,
  blogContent,
  shoppingCart,
  checkoutStatus,
]
