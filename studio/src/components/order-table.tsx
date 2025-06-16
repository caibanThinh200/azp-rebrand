'use client'

// import { TableFooter } from "@/components/ui/table"

import {Card, Stack, Text, Flex} from '@sanity/ui'
import type {ArraySchemaType} from 'sanity'
import {CustomTable, TableHeader, TableBody, TableRow, TableCell, TableFooter} from './table'
import {formatVND} from '../lib/formatVND'

interface OrderItem {
  _key: string
  product?: {_ref: string; _type: 'reference'}
  productName: string
  color?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface OrderItemsTableProps {
  onChange: (patch: any) => void
  value?: any
  schemaType: ArraySchemaType
}

export function OrderItemsTable(props: OrderItemsTableProps) {
  const {value} = props

  // Calculate order total
  const orderTotal = value.total
  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text weight="semibold" size={2}>
            Sản phẩm
          </Text>
        </Flex>

        {/* Order Items Display */}
        {value.length === 0 ? (
          <Card padding={4} radius={2} tone="caution">
            <Text align="center">Không có sản phẩm trong đơn hàng này.</Text>
          </Card>
        ) : (
          <Card overflow="auto">
            <CustomTable>
              <TableHeader>
                <TableRow isHeader>
                  <TableCell>Mã sản phẩm</TableCell>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>Số lượng</TableCell>
                  {/* <TableCell>Unit Price</TableCell> */}
                  <TableCell>Tổng</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {value?.products.map((item) => (
                  <TableRow key={item._key}>
                    <TableCell>
                      <Text weight="medium">{item?.product?.productId}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.color || '—'}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.quanity}</Text>
                    </TableCell>
                    <TableCell>
                      <Text weight="semibold">{formatVND(item?.price * item?.quanity)}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow isFooter>
                  <TableCell colSpan={4} align="right">
                    <Text weight="semibold">Tổng tiền:</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold" size={2}>
                      {formatVND(orderTotal)}
                    </Text>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </CustomTable>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
