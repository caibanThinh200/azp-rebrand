'use client'

import type React from 'react'

import {useState, useEffect} from 'react'
import {useClient} from 'sanity'
import {Card, Container, Stack, Text, Flex, Box, Button} from '@sanity/ui'
import {DragHandleIcon, FolderIcon, TagIcon, EditIcon, AddIcon} from '@sanity/icons'
import {useRouter} from 'sanity/router'

// Helper function to move items in an array
function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const newArray = [...array]
  const [movedItem] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, movedItem)
  return newArray
}

interface Category {
  _id: string
  title: string
  order: number
  hasChildren: boolean
  productCount: number
  slug: string
}

interface DraggableCategoryListProps {
  parentId?: string
  parentTitle?: string
}

export function DraggableCategoryList({parentId, parentTitle}: DraggableCategoryListProps) {
  const client = useClient({apiVersion: '2023-05-03'})
  const router = useRouter()
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
              "slug": slug.current,
              order,
              "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
              "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
            }`
          : `*[_type == "category" && !defined(parent)] | order(order asc, title asc) {
              _id,
              title,
              "slug": slug.current,
              order,
              "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0,
              "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
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

  // Navigation helpers
  const navigateToCategory = (categoryId: string) => {
    router.navigateIntent('edit', {id: categoryId, type: 'category'})
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', '')
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

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

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  if (loading) {
    return (
      <Container width={4}>
        <Card padding={4}>
          <Text>Đang xử lí ...</Text>
        </Card>
      </Container>
    )
  }

  return (
    <Container width={4}>
      <Stack space={4}>
        {/* Header */}
        <Card padding={4}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={3} weight="semibold">
                Sắp xếp thứ tự danh mục con của {parentTitle}
              </Text>
              {saving && <Text size={1}>Đang xử lí...</Text>}
            </Flex>

            <Text size={1} muted>
              Kéo thả để sắp xếp theo thứ tự
            </Text>

            {/* Create new category button */}
            {/* <Button
              text={parentId ? 'Create Child Category' : 'Create Root Category'}
              tone="positive"
              icon={AddIcon}
              onClick={() => {
                if (parentId) {
                  createChildCategory(parentId)
                } else {
                  router.navigateIntent('create', {type: 'category'})
                }
              }}
            /> */}
          </Stack>
        </Card>

        {/* Categories List */}
        {categories.length === 0 ? (
          <Card padding={4}>
            <Text>No categories found at this level.</Text>
          </Card>
        ) : (
          <Card padding={0}>
            <Stack space={0}>
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
                      borderLeft: index === 0 ? undefined : '1px solid var(--card-border-color)',
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <Flex align="center" gap={3}>
                      {/* Drag handle */}
                      <Box>
                        <DragHandleIcon />
                      </Box>

                      {/* Category icon */}
                      <Box>{category.hasChildren ? <FolderIcon /> : <TagIcon />}</Box>

                      {/* Category info */}
                      <Box flex={1}>
                        <Text weight={category.hasChildren ? 'semibold' : 'regular'}>
                          {category.title}
                          {/* <br /> STT: {category.order} */}
                        </Text>
                      </Box>

                      {/* Action buttons */}
                    </Flex>
                  </Card>
                )
              })}
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  )
}
