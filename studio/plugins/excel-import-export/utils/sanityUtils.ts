import type {SanityClient} from 'sanity'
import type {SanityProduct} from './excelUtils'
import {Product} from '../../../sanity.types'

interface BulkImportResult {
  success: number
  failed: number
  errors: Array<{row: number; error: string}>
}

// Bulk create products with progress tracking
export async function bulkCreateProducts(
  client: SanityClient,
  products: Product[],
  onProgress?: (progress: number) => void,
): Promise<BulkImportResult> {
  const result: BulkImportResult = {
    success: 0,
    failed: 0,
    errors: [],
  }

  const batchSize = 10 // Process in batches to avoid overwhelming Sanity
  const totalBatches = Math.ceil(products.length / batchSize)
  for (let i = 0; i < totalBatches; i++) {
    const batch = products.slice(i * batchSize, (i + 1) * batchSize)
    // Process batch
    const batchPromises = batch.map(async (product, index) => {
      const rowNumber = i * batchSize + index + 2 // +2 for Excel row numbering
      try {
        // Check if category exists
        const categoryExists = await client.fetch(
          '*[_type == "category" && title == $category][0]',
          {
            category: product.category,
          },
        )

        if (!categoryExists) {
          throw new Error(`Category with ID '${product.category}' not found`)
        } else {
          product['category'] = {
            _ref: categoryExists?._id,
            _type: 'reference',
          }
        }

        if (product?.colors) {
          product['colors'] = (product?.colors as any)
            ?.split('/')
            .map((color: string) => (color || '')?.trim())
        }

        // Check if product with same title already exists
        const existingProduct = await client.fetch(
          '*[_type == "product" && productId == $productId][0]',
          {
            productId: product.productId,
          },
        )
        console.log(product, 123123123)
        if (existingProduct) {
          // throw new Error(`Product with title '${product.title}'÷ already exists`)
          return await client.patch(existingProduct?._id, product as any)
        }
        // Create the product
        else {
          await client.create({...product, _type: 'product'})
        }
        result.success++
      } catch (error) {
        result.failed++
        result.errors.push({
          row: rowNumber,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    })

    // Wait for batch to complete
    await Promise.all(batchPromises)

    // Update progress
    const progress = ((i + 1) / totalBatches) * 100
    onProgress?.(progress)

    // Small delay to avoid rate limiting
    if (i < totalBatches - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  return result
}

// Get category mapping for validation
export async function getCategoryMapping(client: SanityClient): Promise<Record<string, string>> {
  const categories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      "slug": slug.current
    }
  `)

  const mapping: Record<string, string> = {}
  categories.forEach((cat: any) => {
    mapping[cat.slug] = cat._id
    mapping[cat.title] = cat._id
  })

  return mapping
}

// Validate and transform category references
export async function validateCategoryReferences(
  client: SanityClient,
  products: any[],
): Promise<{valid: any[]; errors: string[]}> {
  const categoryMapping = await getCategoryMapping(client)
  const valid: any[] = []
  const errors: string[] = []

  products.forEach((product, index) => {
    const rowNumber = index + 2

    if (categoryMapping[product.category]) {
      // Update category reference to use ID
      product.category = categoryMapping[product.category]
      valid.push(product)
    } else {
      errors.push(`Row ${rowNumber}: Category '${product.category}' not found`)
    }
  })

  return {valid, errors}
}

// Create import history record
export async function createImportHistory(
  client: SanityClient,
  data: {
    fileName: string
    totalRecords: number
    successCount: number
    failedCount: number
    errors: Array<{row: number; error: string}>
  },
): Promise<void> {
  await client.create({
    _type: 'importHistory',
    fileName: data.fileName,
    importDate: new Date().toISOString(),
    totalRecords: data.totalRecords,
    successCount: data.successCount,
    failedCount: data.failedCount,
    errors: data.errors,
  })
}
