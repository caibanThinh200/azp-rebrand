'use client'

import type React from 'react'
import {useEffect, useState} from 'react'
import {useClient, useFormValue} from 'sanity'
import {Card, Stack, Text, Flex, TextInput, Label, Button} from '@sanity/ui'
import {AddIcon, RemoveIcon} from '@sanity/icons'
import {set, unset, type ArraySchemaType, type ObjectSchemaType, type InputProps} from 'sanity'

interface SanityReference {
  _ref: string
  _type: 'reference'
}

interface FilterValue {
  propertyName?: string
  values?: string
  _key?: string
}

interface Property {
  _id: string
  title: string
}

interface PropertyFilterInputProps {
  onChange: (patch: any) => void
  value?: FilterValue[]
  path: string
  renderDefault: (props: any) => React.ReactElement
  schemaType: ArraySchemaType & {of: ObjectSchemaType[]}
  document: {
    properties?: SanityReference[]
    [key: string]: any
  }
}

export const PropertyFilterInput = (props: InputProps) => {
  const {onChange, value = [], renderDefault, path} = props
  const document = useFormValue(['properties']) as SanityReference[]
  const [newValue, setNewValue] = useState<{[x: string]: string}>({})
  const [availableProperties, setAvailableProperties] = useState<Property[]>([])
  const client = useClient({apiVersion: '2023-05-03'})
  // Get the property references from the document
  const propertyRefs = document || []

  useEffect(() => {
    if (!propertyRefs || propertyRefs.length === 0) return

    // Extract the property IDs
    const propertyIds = propertyRefs.map((ref: SanityReference) => ref._ref)

    // Query for the properties
    const query = `
      *[_type == "property" && _id in $propertyIds] {
        _id,
        title
      }
    `

    client.fetch<Property[]>(query, {propertyIds}).then((properties) => {
      setAvailableProperties(properties || [])
    })
  }, [propertyRefs, client])

  const handleAddValue = (key: string, values: string) => {
    const newValue = {propertyName: key, values, _key: key}
    const uniqueValues = [
      ...new Map(
        [...((value as any[]) || []), newValue].map((item) => [item['_key'], item]),
      ).values(),
    ]
    onChange(set(uniqueValues))
  }

  return (
    <Stack space={3}>
      {/* <Card padding={3} radius={2} tone="primary">
                <Text size={1}>
                    {propertyRefs.length > 0
                        ? `Filter values for selected properties (${availableProperties.length} available)`
                        : "Add properties to the category first to define filter values"}
                </Text>
            </Card> */}
      {availableProperties.length > 0 && (
        <Stack space={2}>
          {availableProperties.map((property) => (
            <Flex align={'center'} key={property._id} gap={5}>
              <Label style={{flexBasis: '15%'}}>{property.title}</Label>
              <TextInput
                defaultValue={
                  (value as FilterValue[]).find((item) => item.propertyName === property._id)
                    ?.values
                }
                onChange={(e) => setNewValue({...newValue, [property._id]: e.currentTarget.value})}
              />
              <div>
                <Button
                  // icon={<AddIcon style={{ flex: 0 }} />}
                  mode="ghost"
                  tone="positive"
                  onClick={() => handleAddValue(property._id, newValue[property._id])}
                  // disabled={!newName.trim() || !newValue.trim()}
                >
                  Lưu
                </Button>
              </div>
            </Flex>
          ))}
        </Stack>
      )}
      {/* {renderDefault({
                ...props,
                value: filteredValue,
            })} */}
    </Stack>
  )
}
