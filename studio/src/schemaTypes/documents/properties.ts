import { Rule } from "sanity";
import { WrenchIcon } from '@sanity/icons'

export default {
    name: "property",
    title: "Thuộc tính sản phẩm",
    type: "document",
    icon: WrenchIcon,
    fields: [
        {
            name: "title",
            title: "Tên thuộc tính",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "unit",
            title: "Đơn vị",
            type: "string",
        },
        {
            name: "type",
            title: "Bộ lọc",
            type: "string",
            options: {
                list: [
                    { value: "color", title: "Màu sắc" },
                    { value: "select", title: "Thanh lựa chọn" },
                    { value: "radio", title: "Radio" }
                ]
            }
        },
        {
            name: "values",
            title: "Giá trị lọc",
            type: "string",
            description: "Nhập nhiều giá trị cách nhau bằng dấu phẩy (VD: 100x50, 200x150)"
        },
        {
            name: "parent",
            title: "Danh mục",
            type: 'array',
            of: [
                {
                    type: "reference",
                    to: [{ type: "category" }],
                }
            ]
        },
    ],
}

