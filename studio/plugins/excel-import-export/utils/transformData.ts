import {Product} from '../../../sanity.types'

export const productFields: {[x: string]: string} = {
  productId: 'Mã Hàng',
  category: 'Tên Hàng',
  description: 'Thông Tin Sản Phẩm',
  colors: 'Màu',
  originPrice: 'Giá Bán Lẻ',
  discountPrice: 'Giá Onsite',
}

export const transformExcelToProduct = (product: {[x: string]: string}) => {
  let productTransform: {[x: string]: string} = {}
  Object.entries(productFields).forEach(([key, value]) => {
    // console.log(key, value, product[value])
    if (!!product[value]) {
      productTransform[key] = product[value]
    }
  })

  return productTransform
}
