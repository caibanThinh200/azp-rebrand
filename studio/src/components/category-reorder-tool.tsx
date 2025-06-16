'use client'

import type React from 'react'

import {useState, useEffect} from 'react'
import {useClient} from 'sanity'
import {Card, Stack, Text, Flex, Box} from '@sanity/ui'
import {DragHandleIcon, FolderIcon, TagIcon} from '@sanity/icons'

interface Category {
  _id: string
  title: string
  order: number
  hasChildren: boolean
  parentId?: string
}

interface CategoryReorderToolProps {
  parentId?: string
  parentTitle?: string
}

function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const newArray = [...array]
  const [movedItem] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, movedItem)
  return newArray
}

export function CategoryReorderTool({parentId, parentTitle}: CategoryReorderToolProps) {
  const client = useClient({apiVersion: '2023-05-03'})
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // Fetch categories for the current parent level
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const query = parentId
          ? `*[_type == "category" && parent._ref == $parentId] | order(order asc, title asc) {
              _id,
              title,
              order,
              "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
              "parentId": parent._ref
            }`
          : `*[_type == "category" && !defined(parent)] | order(order asc, title asc) {
              _id,
              title,
              order,
              "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0
            }`

        const result = await client.fetch(query, parentId ? {parentId} : {})
        setCategories(result)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [client, parentId])

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', '')
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  // Handle drag leave
  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  // Handle drop
  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    setDragOverIndex(null)

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    // Reorder the array
    const newCategories = arrayMove(categories, draggedIndex, dropIndex)
    setCategories(newCategories)
    setDraggedIndex(null)

    // Update order values in Sanity
    setSaving(true)
    try {
      const updates = newCategories.map((item, index) => ({
        id: item._id,
        patch: {
          set: {order: index},
        },
      }))

      // Execute all updates in a transaction
      const transaction = client.transaction()
      updates.forEach(({id, patch}) => {
        transaction.patch(id, patch)
      })

      await transaction.commit()
    } catch (error) {
      console.error('Failed to update category order:', error)
      // Revert local state on error
      const revertedCategories = arrayMove(newCategories, dropIndex, draggedIndex)
      setCategories(revertedCategories)
    } finally {
      setSaving(false)
    }
  }

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  if (loading) {
    return (
      <Card padding={4}>
        <Text>Loading categories...</Text>
      </Card>
    )
  }

  if (categories.length === 0) {
    return (
      <Card padding={4}>
        <Text>No categories found at this level.</Text>
      </Card>
    )
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text weight="semibold" size={2}>
            Reorder Categories{parentTitle ? ` in "${parentTitle}"` : ' (Root Level)'}
          </Text>
          {saving && <Text size={1}>Saving...</Text>}
        </Flex>

        <Stack space={2}>
          {categories.map((category, index) => {
            const isDragging = draggedIndex === index
            const isDragOver = dragOverIndex === index
            const isAboveDragOver = dragOverIndex !== null && index === dragOverIndex - 1
            const isBelowDragOver = dragOverIndex !== null && index === dragOverIndex + 1

            return (
              <Card
                key={category._id}
                padding={3}
                tone={isDragging ? 'primary' : isDragOver ? 'positive' : 'default'}
                style={{
                  opacity: isDragging ? 0.5 : 1,
                  cursor: 'move',
                  borderTop: isAboveDragOver ? '2px solid #0066cc' : undefined,
                  borderBottom: isBelowDragOver ? '2px solid #0066cc' : undefined,
                  transition: 'all 0.2s ease',
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                <Flex align="center" gap={3}>
                  <Box>
                    <DragHandleIcon />
                  </Box>
                  <Box>{category.hasChildren ? <FolderIcon /> : <TagIcon />}</Box>
                  <Text style={{flex: 1}} weight={category.hasChildren ? 'semibold' : 'regular'}>
                    {category.title}
                  </Text>
                  <Text size={1} muted>
                    Order: {category.order}
                  </Text>
                </Flex>
              </Card>
            )
          })}
        </Stack>

        <Text size={1} muted>
          Drag and drop categories to reorder them. Changes are saved automatically.
        </Text>
      </Stack>
    </Card>
  )
}
