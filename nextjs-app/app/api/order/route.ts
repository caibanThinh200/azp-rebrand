import { mailjet } from "@/lib/mailjet";
import mjml2html from "mjml";
import { client } from "@/sanity/lib/client";
import { compile, registerHelper } from "handlebars";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

const template = `
<mjml>
  <mj-body>
    <mj-section background-color="#f5f5f5" padding="20px 0">
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="32px"
          font-weight="bold"
        >
         <p style="font-size: 32px; font-weight: bold;">Xác nhận thanh toán đơn hàng</p>
        </mj-text>
        
      </mj-column>
    </mj-section>

    <mj-section padding="20px 0">
      <mj-column>
        <mj-text font-size="18px" color="#333333" padding="0 0 10px">
          <p>Mã đơn hàng: #{{ _id}}</p>
        </mj-text>
        <mj-text color="#666666" padding="0 0 10px">
         <p>Ngày đặt hàng: {{ _createdAt}}</p>
        </mj-text>
      </mj-column>
    </mj-section>
  
    <!-- Order Items Table -->
    <mj-section margin="20px 0" padding="10px 0">
      <mj-text>
        <h3 style="font-size: 18px; font-weight: bold">Thông tin sản phẩm</h3>
      </mj-text>
      <mj-column>
        <mj-table
          css-class="product-table"
          cellpadding="6"
          cellspacing="0"
          width="100%"
        >
          <tr
            style="background-color: #f8f8f8; border-bottom: 2px solid #e0e0e0"
          >
            <th style="text-align: left; padding: 12px">Tên sản phẩm</th>
            <th style="text-align: center; padding: 12px">Giá</th>
            <th style="text-align: center; padding: 12px">Số lượng</th>
            <th style="text-align: right; padding: 12px">Tổng</th>
          </tr>
          {{#each orderSummary.products}}
          <tr class="product-row">
            <td style="text-align: left; padding: 12px; vertical-align: top">
              <strong>{{this.product.title}}</strong><br />
              <span style="color: #666666; font-size: 13px"
                >{{this.color}}</span
              >
            </td>
            <td style="text-align: center; padding: 12px; vertical-align: top">
              {{this.product.discountPrice}}
            </td>
            <td style="text-align: center; padding: 12px; vertical-align: top">
              {{this.quantity}}
            </td>
            <td style="text-align: right; padding: 12px; vertical-align: top">
              {{this.price}}
            </td>
          </tr>
          {{/each}}
        </mj-table>
      </mj-column>
    </mj-section>
    <!-- Order Summary -->
    <mj-section padding="10px 0 20px">
      <mj-column>
        <mj-table cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td
              style="
                text-align: right;
                padding: 8px 12px;
                border-top: 1px solid #e0e0e0;
              "
            >
              <strong style="font-size: 16px">Tổng đơn hàng:</strong>
            </td>
            <td
              style="
                text-align: right;
                padding: 8px 12px;
                border-top: 1px solid #e0e0e0;
              "
            >
              <strong style="font-size: 16px">{{orderSummary.total}}</strong>
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>
    <mj-section margin="20px 0" padding="10px 0">
      <mj-text>
        <h3 style="font-size: 18px; font-weight: bold">Thông tin liên hệ</h3>
      </mj-text>
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="32px"
          font-weight="bold"
        >
         <p>Họ tên: {{contact.fullName}}</p>
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="32px"
          font-weight="bold"
        >
         <p>Địa chỉ: {{contact.address}}</p>
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="32px"
          font-weight="bold"
        >
         <p>SDT: {{contact.phone}}</p>
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="32px"
          font-weight="bold"
        >
         <p>Email: {{contact.email}}</p>
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="32px"
          font-weight="bold"
        >
         <p>Tin nhắn: {{contact.message}}</p>
        </mj-text>
      </mj-column>
      
    </mj-section>
    
  </mj-body>
</mjml>
`;

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = await client
    .create(body)
    .then(async (res) => {
      const formatData = {
        ...res,
        _createdAt: format(
          (res._createdAt as unknown as Date) || new Date(),
          "dd/MM/yyyy"
        ),
        // _updatedAt: dayjs(res._updatedAt).format("DD-MM-YYYY"),
      };
      const mjmlTemplate = compile(template)(formatData);
      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "thinhdev20@gmail.com",
              Name: "AZP",
            },
            To: [
              {
                Email: "thinhdev20@gmail.com",
                Name: "Thịnh Nguyễn",
              },
            ],
            Subject: "Xác nhận đơn hàng",
            TextPart: "Bạn có 1 đơn hàng mới, Cảm ơn vì đã tin tưởng AZP!",
            HTMLPart: mjmlTemplate,
          },
        ],
      });

      request
        .then((result) => {
          console.log(result.body);
          return res;
        })
        .catch((err) => {
          console.log(err);
          console.log(err.statusCode);
        });
    })
    .catch((e) => {
      throw new Error(e);
    });
  return new NextResponse("Create success");
};
