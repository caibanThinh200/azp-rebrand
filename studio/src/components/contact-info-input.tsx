'use client'

import {Card, Stack, Text, Grid, Box} from '@sanity/ui'
import {TextInput} from '@sanity/ui'
import {set, type ObjectSchemaType} from 'sanity'

interface ContactInfo {
  fullName?: string
  email?: string
  phone?: string
  address?: string
}

interface ContactInfoInputProps {
  onChange: (patch: any) => void
  value?: ContactInfo
  schemaType: ObjectSchemaType
}

export function ContactInfoInput(props: ContactInfoInputProps) {
  const {onChange, value = {}} = props

  const handleChange = (field: string, newValue: string) => {
    onChange(set({...value, [field]: newValue}))
  }

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Text weight="semibold" size={2}>
          Thông tin liên lạc
        </Text>

        <Grid columns={[1, 1, 2]} gap={3}>
          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '0.5rem'}}>
              Họ tên
            </Text>
            <TextInput
              value={value.fullName || ''}
              onChange={(event) => handleChange('fullName', event.currentTarget.value)}
              placeholder="Customer's full name"
            />
          </Box>

          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '0.5rem'}}>
              Email
            </Text>
            <TextInput
              value={value.email || ''}
              onChange={(event) => handleChange('email', event.currentTarget.value)}
              placeholder="customer@example.com"
              type="email"
            />
          </Box>

          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '0.5rem'}}>
              Số điện thoại
            </Text>
            <TextInput
              value={value.phone || ''}
              onChange={(event) => handleChange('phone', event.currentTarget.value)}
              placeholder="Phone number"
            />
          </Box>

          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '0.5rem'}}>
              Địa chỉ
            </Text>
            <TextInput
              value={value.address || ''}
              onChange={(event) => handleChange('address', event.currentTarget.value)}
              placeholder="Shipping address"
            />
          </Box>
        </Grid>
      </Stack>
    </Card>
  )
}
