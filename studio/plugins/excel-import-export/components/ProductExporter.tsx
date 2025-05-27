'use client'

import {useState, useCallback} from 'react'
import {useClient} from 'sanity'
import {Button, Card, Code, Heading, Stack, Text, TextInput, useToast} from '@sanity/ui'
import {DownloadIcon} from '@sanity/icons'
import {exportProductsToExcel} from '../utils/excelUtils'

export function ProductExporter() {
  const client = useClient({apiVersion: '2023-05-03'})
  const toast = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    category: '',
    includeProperties: true,
    includeImages: false,
    format: 'xlsx',
    fileName: 'azp-data-san-pham',
  })

  const handleExport = useCallback(async () => {
    setIsExporting(true)

    try {
      // Build query based on options
      let query = '*[_type == "product"]'
      const params: any = {}

      if (exportOptions.category) {
        query = '*[_type == "product"'
        // params.categorySlug = exportOptions.category
      }

      query += ` {
        productId,
        originPrice,
        discountPrice,
      }`

      // Fetch products
      const products = await client.fetch(query, params)

      if (products.length === 0) {
        toast.push({
          status: 'warning',
          title: 'Không tìm thấy sản phẩm',
          description: 'Vui lòng kiểm tra lại danh sách sản phẩm trong hệ thống',
        })
        return
      }
      // Export to Excel
      await exportProductsToExcel(products, {
        fileName: exportOptions.fileName,
        includeProperties: exportOptions.includeProperties,
        includeImages: exportOptions.includeImages,
      })

      toast.push({
        status: 'success',
        title: 'Export completed',
        description: `Exported ${products.length} products to Excel`,
      })
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Export failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      })
    } finally {
      setIsExporting(false)
    }
  }, [client, exportOptions, toast])

  return (
    <Stack space={4} padding={4}>
      <Heading size={2}>Export sản phẩm ra Excel</Heading>

      <Card padding={3}>
        <Stack space={3}>
          <Stack space={3}>
            {/* <Text weight="semibold">Export Options</Text> */}

            <Stack space={2}>
              <Text size={1}>Tên file:</Text>
              <TextInput
                value={exportOptions.fileName}
                onChange={(event) =>
                  setExportOptions((prev) => ({
                    ...prev,
                    fileName: event.currentTarget.value,
                  }))
                }
                placeholder="azp-data"
              />
            </Stack>

            {/* <Stack space={2}>
              <Text size={1}>Category Filter (optional):</Text>
              <TextInput
                value={exportOptions.category}
                onChange={(event) =>
                  setExportOptions((prev) => ({
                    ...prev,
                    category: event.currentTarget.value,
                  }))
                }
                placeholder="Enter category slug"
              />
            </Stack> */}
            {/* 
            <Flex align="center" gap={2}>
              <Checkbox
                checked={exportOptions.includeProperties}
                onChange={(event) =>
                  setExportOptions((prev) => ({
                    ...prev,
                    includeProperties: event.currentTarget.checked,
                  }))
                }
              />
              <Text size={1}>Include product properties</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Checkbox
                checked={exportOptions.includeImages}
                onChange={(event) =>
                  setExportOptions((prev) => ({
                    ...prev,
                    includeImages: event.currentTarget.checked,
                  }))
                }
              />
              <Text size={1}>Include image URLs</Text>
            </Flex> */}
          </Stack>

          <Button
            icon={DownloadIcon}
            text={isExporting ? 'Exporting...' : 'Export to Excel'}
            tone="positive"
            disabled={isExporting}
            onClick={handleExport}
          />
        </Stack>
      </Card>

      <Card padding={3} tone="primary">
        <Stack padding={4} space={5}>
          <Text weight="semibold">Cấu trúc file Excel</Text>
          <Text size={1}>Bảng excel sẽ bao gồm những cột sau:</Text>
          <Code language="text">
            {`- Mã hàng: Mã hàng của sản phẩm
- Giá Bán Lẻ: Giá trước khi giảm
- Giá Onsite: Giá bán chính thức`}
          </Code>
        </Stack>
      </Card>
    </Stack>
  )
}
