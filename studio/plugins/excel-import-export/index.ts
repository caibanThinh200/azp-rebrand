import { definePlugin } from "sanity"
import { DocumentIcon } from "@sanity/icons"
import { ExcelImportExportTool } from "./components/ExcelImportExportTool"

export const excelImportExportPlugin = definePlugin({
  name: "excel-import-export",
  tools: [
    {
      name: "excel-import-export",
      title: "Nhập / Xuất",
      icon: DocumentIcon,
      component: ExcelImportExportTool,
    },
  ],
})
