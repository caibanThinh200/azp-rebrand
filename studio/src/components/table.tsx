import type {ReactNode} from 'react'
import {Box, Card, Flex, Stack} from '@sanity/ui'

interface TableProps {
  children: ReactNode
}

interface TableHeaderProps {
  children: ReactNode
}

interface TableBodyProps {
  children: ReactNode
}

interface TableFooterProps {
  children: ReactNode
}

interface TableRowProps {
  children: ReactNode
  isHeader?: boolean
  isFooter?: boolean
}

interface TableCellProps {
  children: ReactNode
  colSpan?: number
  align?: 'left' | 'center' | 'right'
}

export function CustomTable({children}: TableProps) {
  return (
    <Card radius={2} overflow="hidden">
      <Box>{children}</Box>
    </Card>
  )
}

export function TableHeader({children}: TableHeaderProps) {
  return <Box style={{borderBottom: '1px solid var(--card-border-color)'}}>{children}</Box>
}

export function TableBody({children}: TableBodyProps) {
  return <Stack space={0}>{children}</Stack>
}

export function TableFooter({children}: TableFooterProps) {
  return <Box style={{borderTop: '1px solid var(--card-border-color)'}}>{children}</Box>
}

export function TableRow({children, isHeader, isFooter}: TableRowProps) {
  return (
    <Flex
      style={{
        borderBottom: !isFooter ? '1px solid var(--card-border-color)' : undefined,
        backgroundColor: isHeader ? 'var(--card-bg-color)' : undefined,
      }}
    >
      {children}
    </Flex>
  )
}

export function TableCell({children, colSpan = 1, align = 'left'}: TableCellProps) {
  return (
    <Box
      flex={colSpan}
      padding={3}
      style={{
        textAlign: align,
        minWidth: '80px',
      }}
    >
      {children}
    </Box>
  )
}
