"use client"

import { useState } from "react"
import { Card, Container, Heading, Stack, Tab, TabList, TabPanel } from "@sanity/ui"
import { ProductImporter } from "./ProductImporter"
import { ProductExporter } from "./ProductExporter"
import { ImportHistory } from "./ImportHistory"

export function ExcelImportExportTool() {
  const [activeTab, setActiveTab] = useState("import")

  return (
    <Container style={{padding: 100}}>
      <Stack space={4}>
        <Heading size={3}>Excel Import/Export for Products</Heading>

        <Card>
          <TabList space={2}>
            <Tab
              aria-controls="import-panel"
              id="import-tab"
              label="Import Products"
              onClick={() => setActiveTab("import")}
              selected={activeTab === "import"}
            />
            <Tab
              aria-controls="export-panel"
              id="export-tab"
              label="Export Products"
              onClick={() => setActiveTab("export")}
              selected={activeTab === "export"}
            />
            <Tab
              aria-controls="history-panel"
              id="history-tab"
              label="Import History"
              onClick={() => setActiveTab("history")}
              selected={activeTab === "history"}
            />
          </TabList>

          <TabPanel aria-labelledby="import-tab" hidden={activeTab !== "import"} id="import-panel">
            <ProductImporter />
          </TabPanel>

          <TabPanel aria-labelledby="export-tab" hidden={activeTab !== "export"} id="export-panel">
            <ProductExporter />
          </TabPanel>

          <TabPanel aria-labelledby="history-tab" hidden={activeTab !== "history"} id="history-panel">
            <ImportHistory />
          </TabPanel>
        </Card>
      </Stack>
    </Container>
  )
}
