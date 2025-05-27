'use client'

import {useState} from 'react'
import {Card, Container, Heading, Stack, Tab, TabList, TabPanel} from '@sanity/ui'
import {ProductImporter} from './ProductImporter'
import {ProductExporter} from './ProductExporter'
import {ImportHistory} from './ImportHistory'

export function ExcelImportExportTool() {
  const [activeTab, setActiveTab] = useState('export')

  return (
    <Container style={{padding: 100}}>
      <Stack space={4}>
        <Heading size={3}>Nhập / Xuất sản phẩm bằng Excel</Heading>
        <Card>
          <TabList space={2}>
            <Tab
              aria-controls="export-panel"
              id="export-tab"
              label="Export"
              onClick={() => setActiveTab('export')}
              selected={activeTab === 'export'}
            />
            <Tab
              aria-controls="import-panel"
              id="import-tab"
              label="Import"
              onClick={() => setActiveTab('import')}
              selected={activeTab === 'import'}
            />
            {/* <Tab
              aria-controls="history-panel"
              id="history-tab"
              label="Lịch sử Import"
              onClick={() => setActiveTab("history")}
              selected={activeTab === "history"}
            /> */}
          </TabList>

          <TabPanel aria-labelledby="import-tab" hidden={activeTab !== 'import'} id="import-panel">
            <ProductImporter />
          </TabPanel>

          <TabPanel aria-labelledby="export-tab" hidden={activeTab !== 'export'} id="export-panel">
            <ProductExporter />
          </TabPanel>

          <TabPanel
            aria-labelledby="history-tab"
            hidden={activeTab !== 'history'}
            id="history-panel"
          >
            <ImportHistory />
          </TabPanel>
        </Card>
      </Stack>
    </Container>
  )
}
