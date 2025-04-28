"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useClient } from "sanity"
import { Card, Stack, Text } from "@sanity/ui"
import { set, unset, type ArraySchemaType, type ObjectSchemaType } from "sanity"

interface SanityReference {
  _ref: string
  _type: "reference"
}

interface PropertyItem {
  property?: SanityReference
  value?: string
}

interface Property {
  _id: string
  name: string
}

interface ProductPropertiesInputProps {
  onChange: (patch: any) => void
  value?: PropertyItem[]
  renderDefault: (props: any) => React.ReactElement
  schemaType: ArraySchemaType & { of: ObjectSchemaType[] }
  document: {
    category?: SanityReference
    [key: string]: any
  }
}

export const ProductPropertiesInput = (props: ProductPropertiesInputProps) => {
  const { onChange, value = [], renderDefault, document } = props

  const [availableProperties, setAvailableProperties] = useState<Property[]>([])
  const client = useClient({ apiVersion: "2023-05-03" })

  // Get the current category ID
  const categoryId = document?.category?._ref

  useEffect(() => {
    if (!categoryId) return

    // Query for properties that are defined for this category
    const query = `
      *[_type == "category" && _id == $categoryId][0] {
        "properties": properties[]->{ 
          _id, 
          name 
        }
      }.properties
    `

    client.fetch<Property[]>(query, { categoryId }).then((properties) => {
      setAvailableProperties(properties || [])
    })
  }, [categoryId, client])

  // Filter the existing properties to only include those that are applicable
  const filteredValue = value.filter((item) => {
    const propertyId = item.property?._ref
    return propertyId && availableProperties.some((p) => p._id === propertyId)
  })

  // If the filtered value is different from the current value, update it
  useEffect(() => {
    if (JSON.stringify(filteredValue) !== JSON.stringify(value)) {
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
            ? `Properties for the selected category (${availableProperties.length} available)`
            : "Select a category first to see available properties"}
        </Text>
      </Card>
      {renderDefault({
        ...props,
        value: filteredValue,
      })}
    </Stack>
  )
}

