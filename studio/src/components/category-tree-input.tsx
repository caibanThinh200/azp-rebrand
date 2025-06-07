'use client'
import {useState, useEffect, useCallback} from 'react'
import {useClient} from 'sanity'
import {Box, Card, Checkbox, Flex, Stack, Text, Button} from '@sanity/ui'
import {ChevronDownIcon, ChevronRightIcon, FolderIcon, TagIcon} from '@sanity/icons'
import {set, unset} from 'sanity'
import {id} from 'date-fns/locale'

interface CategoryData {
  _id: string
  title: string
  slug: string
  parentId?: string
  hasChildren: boolean
}

interface CategoryTreeInputProps {
  onChange: (patch: any) => void
  value?: Array<{_ref: string; _type: 'reference'}>
  schemaType: any
}

export const CategoryTreeInput = (props: CategoryTreeInputProps) => {
  const {onChange, value = []} = props
  const client = useClient({apiVersion: '2023-05-03'})

  const [allCategories, setAllCategories] = useState<CategoryData[]>([])
  const [rootCategories, setRootCategories] = useState<CategoryData[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(value.map((ref) => ref._ref)),
  )
  const [loading, setLoading] = useState(true)

  // Fetch all categories as a flat list
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)

      const categories = await client.fetch(`
        *[_type == "category"] {
          _id,
          title,
          "slug": slug.current,
          "parentId": parent._ref,
          "hasChildren": count(*[_type == "category" && parent._ref == ^._id]) > 0
        }
      `)

      setAllCategories(categories)

      // Filter root categories (those without parentId)
      const roots = categories.filter((cat: CategoryData) => !cat.parentId)
      setRootCategories(roots)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Update selected categories when value changes
  useEffect(() => {
    setSelectedCategories(new Set(value.map((ref) => ref._ref)))
  }, [value])

  // Get children of a specific category
  const getChildren = (parentId: string): CategoryData[] => {
    return allCategories.filter((cat) => cat.parentId === parentId)
  }

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const toggleCategory = (categoryId: string) => {
    const newSelected = new Set(selectedCategories)

    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId)
    } else {
      newSelected.add(categoryId)
    }

    setSelectedCategories(newSelected)
    console.log(newSelected)
    // Update Sanity value
    const newValue = Array.from(newSelected)
      .filter((id) => !!id)
      .map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: id,
      }))
    // console.log(newValue)
    if (newValue.length === 0) {
      onChange(unset())
    } else {
      onChange(set(newValue))
    }
  }

  // Render a single category with its children
  const renderCategory = (category: CategoryData, level = 0) => {
    const isExpanded = expandedNodes.has(category._id)
    const isSelected = selectedCategories.has(category._id)
    const children = getChildren(category._id)
    const hasChildren = children.length > 0
    const paddingLeft = level * 20

    return (
      <Stack key={category._id} space={1}>
        {/* Current category */}
        <Flex align="center" padding={2} style={{paddingLeft: `${paddingLeft}px`}}>
          {/* Expand/collapse button */}
          {hasChildren ? (
            <Button
              mode="bleed"
              padding={2}
              fontSize={1}
              icon={isExpanded ? ChevronDownIcon : ChevronRightIcon}
              onClick={() => toggleExpanded(category._id)}
            />
          ) : (
            <Box style={{width: '28px'}} />
          )}

          {/* Category selection and info */}
          <Flex align="center" gap={2} flex={1}>
            <Checkbox checked={isSelected} onChange={() => toggleCategory(category._id)} />
            {/* <Box marginRight={1}>{hasChildren ? <FolderIcon /> : <TagIcon />}</Box> */}
            <Text size={1} weight={hasChildren ? 'semibold' : 'regular'}>
              {category.title}
            </Text>
            {hasChildren && (
              <Text size={0} muted>
                ({children.length} danh mục con)
              </Text>
            )}
          </Flex>
        </Flex>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <Box>{children.map((child) => renderCategory(child, level + 1))}</Box>
        )}
      </Stack>
    )
  }

  // Expand all root categories by default
  useEffect(() => {
    if (rootCategories.length > 0) {
      const rootIds = rootCategories.map((cat) => cat._id)
      setExpandedNodes(new Set(rootIds))
    }
  }, [rootCategories])

  if (loading) {
    return (
      <Card padding={3}>
        <Text>Loading categories...</Text>
      </Card>
    )
  }

  return (
    <Card padding={3} tone="transparent" border>
      <Stack space={3}>
        {/* Header */}
        <Flex align="center" justify="space-between">
          <Text weight="semibold">Lựa chọn danh mục</Text>
          <Flex align="center" gap={2}>
            <Text size={1} muted>
              Đã chọn {selectedCategories.size} danh mục
            </Text>
            {rootCategories.length > 0 && (
              <Button
                mode="ghost"
                fontSize={0}
                text={expandedNodes.size === 0 ? 'Mở tất cả' : 'Đóng tất cả'}
                onClick={() => {
                  if (expandedNodes.size === 0) {
                    // Expand all categories
                    const allIds = allCategories.map((cat) => cat._id)
                    setExpandedNodes(new Set(allIds))
                  } else {
                    // Collapse all
                    setExpandedNodes(new Set())
                  }
                }}
              />
            )}
          </Flex>
        </Flex>

        {/* Category tree */}
        {rootCategories.length === 0 ? (
          <Text size={1} muted>
            Không có danh mục nào được tạo
          </Text>
        ) : (
          <Card padding={0} style={{maxHeight: '400px', overflowY: 'auto'}}>
            <Stack space={0}>
              {rootCategories.map((rootCategory) => renderCategory(rootCategory, 0))}
            </Stack>
          </Card>
        )}

        {/* Selection summary */}
        {selectedCategories.size > 0 && (
          <Card padding={2} tone="positive">
            <Flex align="center" justify="space-between">
              <Text size={1}>
                Danh mục đã chọn: {selectedCategories.size}{' '}
                {/* {selectedCategories.size === 1 ? 'category' : 'categories'} */}
              </Text>
              <Button
                mode="ghost"
                fontSize={0}
                text="Gỡ tất cả danh mục"
                onClick={() => {
                  setSelectedCategories(new Set())
                  onChange(unset())
                }}
              />
            </Flex>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
