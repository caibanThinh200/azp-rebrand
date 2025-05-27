import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import {productFields, transformExcelToProduct, transformProductToExcel} from './transformData'

export interface ExcelProduct {
  title: string
  price: number
  description?: string
  category: string
  [key: string]: any // For dynamic properties
}

export interface SanityProduct {
  _type: 'product'
  title: string
  slug: {current: string; _type: 'slug'}
  price: number
  description?: string
  category: {_type: 'reference'; _ref: string}
  properties: Array<{
    _key: string
    title: string
    propertyName: string
    values: string
  }>
}

// Parse Excel file and return JSON data
export async function parseExcelFile(file: File): Promise<ExcelProduct[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, {type: 'array'})

        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[worksheetName]
        console.log(worksheet)
        // Convert to JSON
        let jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
        }) as string[][]
        //remove stt column
        // jsonData = jsonData.map((row) => row.filter((column, idx) => column[idx] !== column[0]))
        // console.log(jsonData)
        if (jsonData.length < 2) {
          throw new Error('Excel file must have at least a header row and one data row')
        }

        // Get headers from first row
        const headers = jsonData[0]
        console.log(headers)
        // Convert rows to objects
        const products: any[] = []

        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i]
          const product: any = {}

          headers.forEach((header, index) => {
            if (header && row[index] !== undefined) {
              product[header.trim()] = row[index]
            }
          })

          products.push(product)
        }
        resolve(products)
      } catch (error) {
        reject(
          new Error(
            `Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ),
        )
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsArrayBuffer(file)
  })
}

// Validate product data structure
export function validateProductData(products: ExcelProduct[]): string[] {
  const errors: string[] = []

  if (products.length === 0) {
    errors.push('No products found in the file')
    return errors
  }

  // Check required fields
  const requiredFields = ['Mã Hàng', 'Giá Bán Lẻ', 'Giá Onsite']
  products.forEach((product, index) => {
    const rowNumber = index + 2 // +2 because Excel rows start at 1 and we skip header
    
    requiredFields.forEach((field) => {
      if (!product[field]) {
        errors.push(`Dòng ${rowNumber}: Sản phẩm này đang thiếu trường '${field}'`)
      }
    })

    // Validate price is a number
    // if (product.price && isNaN(Number(product.price))) {
    //   errors.push(`Dòng ${rowNumber}: Giá phải là số`)
    // }

    // Validate title length
    // if (product.title && product.title.length > 200) {
    //   errors.push(`Dòng ${rowNumber}: Title is too long (max 200 characters)`)
    // }
  })

  return errors
}

// Transform Excel data to Sanity product format
export function transformToSanityProduct(excelProduct: ExcelProduct): SanityProduct {
  // Generate slug from title
  const slug = excelProduct.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  // Extract properties (fields starting with 'property_')
  const properties: Array<{
    _key: string
    title: string
    propertyName: string
    values: string
  }> = []

  Object.entries(excelProduct).forEach(([key, value]) => {
    if (key.startsWith('property_') && value) {
      const propertyName = key.replace('property_', '')
      const propertyKey = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      properties.push({
        _key: propertyKey,
        title: propertyName.charAt(0).toUpperCase() + propertyName.slice(1),
        propertyName: propertyKey,
        values: String(value),
      })
    }
  })

  return {
    _type: 'product',
    title: excelProduct.title,
    slug: {
      current: slug,
      _type: 'slug',
    },
    price: Number(excelProduct.price),
    description: excelProduct.description,
    category: {
      _type: 'reference',
      _ref: excelProduct.category, // This should be the category ID
    },
    properties,
  }
}

// Export products to Excel
export async function exportProductsToExcel(
  products: any[],
  options: {
    fileName: string
    includeProperties: boolean
    includeImages: boolean
  },
): Promise<void> {
  // Transform products to flat structure for Excel
  const excelData = products.map((product) => {
    const row = transformProductToExcel(product)

    // Add image URL if requested
    // if (options.includeImages && product.image) {
    //   row.image_url = product.image
    // }

    // // Add properties as separate columns if requested
    // if (options.includeProperties && product.properties) {
    //   product.properties.forEach((prop: any) => {
    //     const columnName = `property_${prop.title.toLowerCase().replace(/\s+/g, '_')}`
    //     row[columnName] = prop.values
    //   })
    // }
    // console.log(row)
    return row
  })
  // console.log(excelData);
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(excelData)

  // Auto-size columns
  const columnWidths = Object.keys(excelData[0] || {}).map((key) => ({
    wch: Math.max(key.length, 15),
  }))
  worksheet['!cols'] = columnWidths

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  // Save file
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  saveAs(blob, `${options.fileName}.xlsx`)
}

// Generate Excel template for import
export function generateImportTemplate(): void {
  const templateData = [
    {
      title: 'Sample Product 1',
      price: 199.99,
      description: 'This is a sample product description',
      category: 'furniture-category-id',
      property_material: 'Wood',
      property_color: 'Brown',
      property_size: 'Large',
      image_url: 'https://example.com/image1.jpg',
    },
    {
      title: 'Sample Product 2',
      price: 299.99,
      description: 'Another sample product',
      category: 'furniture-category-id',
      property_material: 'Metal',
      property_color: 'Black',
      property_size: 'Medium',
      image_url: 'https://example.com/image2.jpg',
    },
  ]

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(templateData)

  // Add instructions sheet
  const instructions = [
    ['Import Instructions'],
    [''],
    ['Required Columns:'],
    ['- title: Product title (required)'],
    ['- price: Product price as number (required)'],
    ['- category: Category ID from Sanity (required)'],
    [''],
    ['Optional Columns:'],
    ['- description: Product description'],
    ['- property_[name]: Product properties (e.g., property_material)'],
    ['- image_url: Image URL'],
    [''],
    ['Notes:'],
    ['- Category must be a valid Sanity document ID'],
    ['- Properties will be created automatically'],
    ['- Remove sample data before importing'],
  ]

  const instructionsSheet = XLSX.utils.aoa_to_sheet(instructions)

  XLSX.utils.book_append_sheet(workbook, instructionsSheet, 'Instructions')
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  saveAs(blob, 'product-import-template.xlsx')
}
