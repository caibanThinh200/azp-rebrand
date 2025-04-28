import React, {useEffect, useState} from 'react'
import {InputProps, useClient} from 'sanity'
import {Box, Card, Stack, Text} from '@sanity/ui'
import {useFormValue} from 'sanity'
import {set, unset, ArraySchemaType, ObjectSchemaType, ReferenceSchemaType} from 'sanity'

// Define types for Sanity documents and references
interface SanityReference {
  _ref: string
  _type: 'reference'
}

interface SanityDocument {
  _id: string
  _type: string
  [key: string]: any
}

interface PropertyItem {
  property?: SanityReference
  value?: string
}

interface Property {
  _id: string
  name: string
}

interface ConditionalPropertiesInputProps {
  onChange: (patch: any) => void
  value?: PropertyItem[]
  renderDefault: (props: any) => React.ReactElement
  schemaType: ArraySchemaType & {of: ObjectSchemaType[]}
}

export const ConditionalPropertiesInput = (props: InputProps) => {
  const {onChange, value = [], renderDefault, schemaType} = props
  const document = useFormValue(['category']) as SanityReference

  const [availableProperties, setAvailableProperties] = useState<Property[]>([])
  const client = useClient({apiVersion: '2023-05-03'})
  // Get the current category ID
  const categoryId = document?._ref

  useEffect(() => {
    if (!categoryId) return

    // Query for properties that apply to this category
    const query = `
      *[_type == "property" && $categoryId in categories[]._ref] {
        _id,
        name
      }
    `

    client.fetch<Property[]>(query, {categoryId}).then((properties) => {
      setAvailableProperties(properties || [])
    })
  }, [categoryId, client])

  // Filter the existing properties to only include those that are applicable
  const filteredValue = (value || []).filter((item) => {
    const propertyId = item.property?._ref
    return propertyId && availableProperties.some((p) => p._id === propertyId)
  })

  // If the filtered value is different from the current value, update it
  useEffect(() => {
    if (JSON.stringify(filteredValue) !== JSON.stringify(value)) {
      // In v3, we need to use the set/unset pattern
      onChange(unset())
      if (filteredValue.length > 0) {
        onChange(set(filteredValue))
      }
    }
  }, [availableProperties, value, filteredValue, onChange])

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} tone="primary">
        <Text size={1}>
          {categoryId
            ? `Các thuộc tính của danh mục đã chọn (${availableProperties.length})`
            : 'Chọn 1 danh mục'}
        </Text>
      </Card>
      {renderDefault({
        ...props,
        value: filteredValue,
      })}
    </Stack>
  )
}
