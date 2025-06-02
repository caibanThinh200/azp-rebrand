'use client'

import type React from 'react'
import {useEffect, useState} from 'react'
import {useClient, useFormValue} from 'sanity'
import {Card, Stack, Text, Flex, TextInput, Label, Button, Select} from '@sanity/ui'
import {AddIcon, RemoveIcon} from '@sanity/icons'
import {set, unset, type ArraySchemaType, type ObjectSchemaType, type InputProps} from 'sanity'

interface SanityReference {
  _ref: string
  _type: 'reference'
}

interface FilterValue {
  propertyId?: string
  values?: string
  _key?: string
}

interface Property {
  _id: string
  title: string
  values: string[]
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

export const ConditionalPropertiesInput = (props: InputProps) => {
  const {onChange, value = [], renderDefault, path} = props
  // const document = useFormValue(['properties']) as SanityReference[]
  const [newValue, setNewValue] = useState<{[x: string]: string}>({})
  const [availableProperties, setAvailableProperties] = useState<Property[]>([])
  const client = useClient({apiVersion: '2023-05-03'})
  // Get the property references from the document
  const propertyRefs = document || []

  useEffect(() => {
    const query = `
      *[_type == "property" && !(_id in path("drafts.*"))] {
        ...,
      }
    `

    client.fetch<Property[]>(query).then((properties) => {
      setAvailableProperties(properties || [])
    })
  }, [propertyRefs, client])

  useEffect(() => {
    let obj: Record<string, any> = {}

    ;(value as FilterValue[])?.forEach((item) => {
      if (!!obj[item.propertyId as string]) {
        obj[item.propertyId as string] = item?.values
      }
    })
    setNewValue({...newValue, ...obj})
  }, [value])

  const handleAddValue = (key: string, values: string, name: string) => {
    const newValue = {propertyId: key, values, _key: key, title: name}
    const uniqueValues = [
      ...new Map(
        [...((value as any[]) || []), newValue]
          .filter((val) => val?.values)
          .map((item) => [item['_key'], item]),
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
              {property?.values?.length > 0 ? (
                <Select
                  defaultValue={property?.values[0]}
                  onChange={(e) =>
                    setNewValue({...newValue, [property._id]: e.currentTarget.value})
                  }
                >
                  {property?.values?.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              ) : (
                <div style={{width: '100%'}}>
                  <TextInput
                    defaultValue={
                      (value as FilterValue[]).find((item) => item.propertyId === property._id)
                        ?.values
                    }
                    onChange={(e) =>
                      setNewValue({...newValue, [property._id]: e.currentTarget.value})
                    }
                  />
                </div>
              )}
              <div>
                <Button
                  // icon={<AddIcon style={{ flex: 0 }} />}
                  mode="ghost"
                  tone="positive"
                  onClick={() =>
                    handleAddValue(property._id, newValue[property._id], property?.title)
                  }
                  // disabled={!newName.trim() || !newValue.trim()}
                >
                  Lưu
                </Button>
              </div>
            </Flex>
          ))}
        </Stack>
      )}
      {renderDefault({
        ...props,
        // value: filteredValue,
      })}
    </Stack>
  )
}
