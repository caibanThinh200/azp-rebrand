"use client"

import { useState, useEffect } from "react"
import { useClient } from "sanity"
import { Card, Heading, Stack, Text, Badge, Button } from "@sanity/ui"
import { TrashIcon } from "@sanity/icons"

interface ImportRecord {
  _id: string
  fileName: string
  importDate: string
  totalRecords: number
  successCount: number
  failedCount: number
  errors: Array<{ row: number; error: string }>
}

export function ImportHistory() {
  const client = useClient({ apiVersion: "2023-05-03" })
  const [history, setHistory] = useState<ImportRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const records = await client.fetch(`
          *[_type == "importHistory"] | order(_createdAt desc) [0...50] {
            _id,
            fileName,
            importDate,
            totalRecords,
            successCount,
            failedCount,
            errors
          }
        `)
        setHistory(records)
      } catch (error) {
        console.error("Failed to fetch import history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [client])

  const deleteRecord = async (id: string) => {
    try {
      await client.delete(id)
      setHistory((prev) => prev.filter((record) => record._id !== id))
    } catch (error) {
      console.error("Failed to delete record:", error)
    }
  }

  if (isLoading) {
    return (
      <Stack space={4} padding={4}>
        <Text>Loading import history...</Text>
      </Stack>
    )
  }

  return (
    <Stack space={4} padding={4}>
      <Heading size={2}>Import History</Heading>

      {history.length === 0 ? (
        <Card padding={4}>
          <Text>No import history found.</Text>
        </Card>
      ) : (
        <Card>
          {/* <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Date</th>
                <th>Total</th>
                <th>Success</th>
                <th>Failed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <td>
                    <Text size={1}>{record.fileName}</Text>
                  </td>
                  <td>
                    <Text size={1}>{new Date(record.importDate).toLocaleDateString()}</Text>
                  </td>
                  <td>
                    <Text size={1}>{record.totalRecords}</Text>
                  </td>
                  <td>
                    <Text size={1}>{record.successCount}</Text>
                  </td>
                  <td>
                    <Text size={1}>{record.failedCount}</Text>
                  </td>
                  <td>
                    <Badge tone={record.failedCount === 0 ? "positive" : "caution"}>
                      {record.failedCount === 0 ? "Success" : "Partial"}
                    </Badge>
                  </td>
                  <td>
                    <Button icon={TrashIcon} mode="ghost" tone="critical" onClick={() => deleteRecord(record._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </Card>
      )}
    </Stack>
  )
}
