"use client"

import { useState, useCallback } from "react"
import { useClient } from "sanity"
import { Button, Card, Checkbox, Flex, Heading, Stack, Text, TextInput, useToast } from "@sanity/ui"
import { DownloadIcon } from "@sanity/icons"
import { exportProductsToExcel } from "../utils/excelUtils"

export function ProductExporter() {
  const client = useClient({ apiVersion: "2023-05-03" })
  const toast = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    category: "",
    includeProperties: true,
    includeImages: false,
    format: "xlsx",
    fileName: "products-export",
  })

  const handleExport = useCallback(async () => {
    setIsExporting(true)

    try {
      // Build query based on options
      let query = '*[_type == "product"]'
      const params: any = {}

      if (exportOptions.category) {
        query = '*[_type == "product" && category->slug.current == $categorySlug]'
        params.categorySlug = exportOptions.category
      }

      query += ` {
        _id,
        title,
        price,
        description,
        "slug": slug.current,
        "category": category->slug.current,
        "categoryTitle": category->title,
        ${exportOptions.includeProperties ? '"properties": properties[],' : ""}
        ${exportOptions.includeImages ? '"image": image.asset->url,' : ""}
        _createdAt,
        _updatedAt
      }`

      // Fetch products
      const products = await client.fetch(query, params)

      if (products.length === 0) {
        toast.push({
          status: "warning",
          title: "No products found",
          description: "No products match the selected criteria",
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
        status: "success",
        title: "Export completed",
        description: `Exported ${products.length} products to Excel`,
      })
    } catch (error) {
      toast.push({
        status: "error",
        title: "Export failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsExporting(false)
    }
  }, [client, exportOptions, toast])

  return (
    <Stack space={4} padding={4}>
      <Heading size={2}>Export Products to Excel</Heading>

      <Card padding={4}>
        <Stack space={4}>
          <Stack space={3}>
            <Text weight="semibold">Export Options</Text>

            <Stack space={2}>
              <Text size={1}>File Name:</Text>
              <TextInput
                value={exportOptions.fileName}
                onChange={(event) =>
                  setExportOptions((prev) => ({
                    ...prev,
                    fileName: event.currentTarget.value,
                  }))
                }
                placeholder="products-export"
              />
            </Stack>

            <Stack space={2}>
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
            </Stack>

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
            </Flex>
          </Stack>

          <Button
            icon={DownloadIcon}
            text={isExporting ? "Exporting..." : "Export to Excel"}
            tone="positive"
            disabled={isExporting}
            onClick={handleExport}
          />
        </Stack>
      </Card>

      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Text weight="semibold">Export Format</Text>
          <Text size={1}>The exported Excel file will contain the following columns:</Text>
          <Text size={1}>• Basic fields: title, price, description, category, slug</Text>
          <Text size={1}>• Properties: property_[name] columns (if enabled)</Text>
          <Text size={1}>• Images: image_url column (if enabled)</Text>
          <Text size={1}>• Metadata: created and updated dates</Text>
        </Stack>
      </Card>
    </Stack>
  )
}
