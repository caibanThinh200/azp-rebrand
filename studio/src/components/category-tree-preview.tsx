'use client'
import {useState, useEffect} from 'react'
import {useClient} from 'sanity'
import {Badge, Box, Flex, Stack, Text} from '@sanity/ui'
import {FolderIcon, TagIcon} from '@sanity/icons'

interface CategoryReference {
  _ref: string
  _type: 'reference'
}

interface CategoryTreePreviewProps {
  value?: CategoryReference[]
}

interface CategoryInfo {
  _id: string
  title: string
  slug: string
  isParent: boolean
  parent?: {
    title: string
    slug: string
  }
}

export const CategoryTreePreview = ({value = []}: CategoryTreePreviewProps) => {
  const client = useClient({apiVersion: '2023-05-03'})
  const [categories, setCategories] = useState<CategoryInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (value.length === 0) {
      setCategories([])
      setLoading(false)
      return
    }

    const fetchCategories = async () => {
      try {
        const categoryIds = value.map((ref) => ref._ref)
        const result = await client.fetch(
          `
          *[_type == "category" && _id in $categoryIds] {
            _id,
            title,
            "slug": slug.current,
            "isParent": count(*[_type == "category" && parent._ref == ^._id]) > 0,
            "parent": parent->{
              title,
              "slug": slug.current
            }
          }
        `,
          {categoryIds},
        )
        setCategories(result)
      } catch (error) {
        console.error('Failed to fetch category details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [value, client])

  if (loading) {
    return <Text size={1}>Loading categories...</Text>
  }

  if (categories.length === 0) {
    return (
      <Text size={1} muted>
        No categories selected
      </Text>
    )
  }

  // Group categories by parent
  const groupedCategories = categories.reduce(
    (acc, category) => {
      const parentKey = category.parent?.title || 'Root'
      if (!acc[parentKey]) {
        acc[parentKey] = []
      }
      acc[parentKey].push(category)
      return acc
    },
    {} as Record<string, CategoryInfo[]>,
  )

  return (
    <Stack space={2}>
      {Object.entries(groupedCategories).map(([parentName, cats]) => (
        <Box key={parentName}>
          {parentName !== 'Root' && (
            <Text size={1} weight="semibold" muted>
              {parentName}:
            </Text>
          )}
          <Flex wrap="wrap" gap={1} marginTop={1}>
            {cats.map((category) => (
              <Badge
                key={category._id}
                tone={category.isParent ? 'primary' : 'default'}
                mode="outline"
              >
                <Flex align="center" gap={1}>
                  {category.isParent ? <FolderIcon /> : <TagIcon />}
                  <Text size={1}>{category.title}</Text>
                </Flex>
              </Badge>
            ))}
          </Flex>
        </Box>
      ))}
    </Stack>
  )
}
