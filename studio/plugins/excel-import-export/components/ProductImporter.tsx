'use client'

import type React from 'react'
import {useState, useCallback} from 'react'
import {useClient} from 'sanity'
import {Box, Button, Card, Code, Flex, Heading, Stack, Text, useToast} from '@sanity/ui'
import {UploadIcon, CheckmarkIcon, ErrorOutlineIcon} from '@sanity/icons'
import {parseExcelFile, validateProductData, transformToSanityProduct} from '../utils/excelUtils'
import {bulkCreateProducts} from '../utils/sanityUtils'
import {transformExcelToProduct} from '../utils/transformData'

interface ImportResult {
  success: number
  failed: number
  errors: Array<{row: number; error: string}>
}

export function ProductImporter() {
  const client = useClient({apiVersion: '2023-05-03'})
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]
      if (!selectedFile) return

      if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
        toast.push({
          status: 'error',
          title: 'Invalid file type',
          description: 'Please select an Excel file (.xlsx or .xls)',
        })
        return
      }

      setFile(selectedFile)
      setPreviewData([])
      setImportResult(null)
      setValidationErrors([])

      try {
        // Parse and preview the first 5 rows
        const data = await parseExcelFile(selectedFile)
        const preview = data.slice(1, 6)
        setPreviewData(preview)

        // Validate the data structure
        const errors = validateProductData(data)
        setValidationErrors(errors)

        if (errors.length === 0) {
          toast.push({
            status: 'success',
            title: 'File parsed successfully',
            description: `Found ${data.length} products ready for import`,
          })
        } else {
          toast.push({
            status: 'warning',
            title: 'Validation issues found',
            description: `${errors.length} issues need to be resolved before import`,
          })
        }
      } catch (error) {
        toast.push({
          status: 'error',
          title: 'Failed to parse file',
          description: error instanceof Error ? error.message : 'Unknown error occurred',
        })
      }
    },
    [toast],
  )

  const handleImport = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    setImportResult(null)

    try {
      // Parse the Excel file
      const rawData = await parseExcelFile(file)

      // Validate data
      const errors = validateProductData(rawData)
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`)
      }

      // Transform to Sanity format
      const products = rawData.map(transformExcelToProduct)
      // Import products in batches
      const result = await bulkCreateProducts(client, products as any[], (progress) => {
        setProgress(progress)
      })

      setImportResult(result)

      // Log import to history
      // await client.create({
      //   _type: 'importHistory',
      //   fileName: file.name,
      //   importDate: new Date().toISOString(),
      //   totalRecords: rawData.length,
      //   successCount: result.success,
      //   failedCount: result.failed,
      //   errors: result.errors,
      // })

      toast.push({
        status: 'success',
        title: 'Import completed',
        description: `Successfully imported ${result.success} products`,
      })
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }, [file, client, toast])

  const downloadTemplate = useCallback(() => {
    // Create a sample Excel template
    // This would use the excel export utility
    // For now, we'll just show instructions
    toast.push({
      status: 'info',
      title: 'Template format',
      description: 'Check the documentation for the required Excel format',
    })
  }, [toast])

  return (
    <Stack space={4} padding={4}>
      <Heading size={2}>Import sản phẩm từ file Excel</Heading>

      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Text weight="semibold">Excel Format:</Text>
          <Code language="text">
            {`- Mã hàng: Mã hàng của sản phẩm
- Giá Bán Lẻ: Giá trước khi giảm
- Giá Onsite: Giá bán chính thức`}
          </Code>
          {/* <Button mode="ghost" onClick={downloadTemplate} text="Download Template" /> */}
        </Stack>
      </Card>

      <Card padding={4}>
        <Stack space={4}>
          <Flex align="center" gap={3}>
            <Box flex={1}>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                style={{width: '100%'}}
              />
            </Box>
            <Button
              icon={UploadIcon}
              text="Select Excel File"
              tone="primary"
              disabled={isProcessing}
            />
          </Flex>

          {validationErrors.length > 0 && (
            <Card padding={3} tone="critical">
              <Stack space={2}>
                <Text weight="semibold">Validation Errors:</Text>
                {validationErrors.map((error, index) => (
                  <Text key={index} size={1}>
                    • {error}
                  </Text>
                ))}
              </Stack>
            </Card>
          )}

          {previewData.length > 0 && (
            <Card padding={3} tone="positive">
              <Stack space={3}>
                <Text weight="semibold">Preview (first 5 rows):</Text>
                <Code language="json">{JSON.stringify(previewData, null, 2)}</Code>
              </Stack>
            </Card>
          )}

          {file && validationErrors.length === 0 && (
            <Button
              text={isProcessing ? 'Importing...' : 'Import Products'}
              tone="positive"
              disabled={isProcessing}
              onClick={handleImport}
            />
          )}

          {isProcessing && (
            <Card padding={3}>
              <Stack space={2}>
                <Text>Import Progress: {Math.round(progress)}%</Text>
                {/* <Progress value={progress} /> */}
              </Stack>
            </Card>
          )}

          {importResult && (
            <Card padding={3} tone={importResult.failed > 0 ? 'caution' : 'positive'}>
              <Stack space={3}>
                <Flex align="center" gap={2}>
                  {importResult.failed === 0 ? <CheckmarkIcon /> : <ErrorOutlineIcon />}
                  <Text weight="semibold">Import Results</Text>
                </Flex>
                <Text>Successfully imported: {importResult.success} products</Text>
                {importResult.failed > 0 && (
                  <>
                    <Text>Failed: {importResult.failed} products</Text>
                    <Stack space={2}>
                      <Text weight="semibold">Errors:</Text>
                      {importResult.errors.map((error, index) => (
                        <Text key={index} size={1}>
                          Row {error.row}: {error.error}
                        </Text>
                      ))}
                    </Stack>
                  </>
                )}
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>
    </Stack>
  )
}
