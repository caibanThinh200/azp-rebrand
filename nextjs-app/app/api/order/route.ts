import { mailjet } from "@/lib/mailjet";
import mjml2html from "mjml";
import { client } from "@/sanity/lib/client";
import { compile, registerHelper } from "handlebars";
import { NextRequest, NextResponse } from "next/server";

const template = `
<mjml>
  <mj-head>
    <mj-title>Order Confirmation</mj-title>
    <mj-preview>Thank you for your order!</mj-preview>
    <mj-style>
      .product-row { border-bottom: 1px solid #e0e0e0; } .product-row:last-child
      { border-bottom: none; }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section background-color="#f5f5f5" padding="20px 0">
      <mj-column>
        <mj-text
          align="center"
          color="#333333"
          font-size="24px"
          font-weight="bold"
        >
          Order Confirmation
        </mj-text>
        <mj-text
          align="center"
          color="#666666"
          font-size="16px"
          padding="10px 0 0"
        >
          Thank you for your purchase!
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="20px 0">
      <mj-column>
        <mj-text font-size="18px" color="#333333" padding="0 0 10px">
          Order #{{ _id}}
        </mj-text>
        <mj-text color="#666666" padding="0 0 10px">
          Order Date: {{ _createdAt}}
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Order Items Table -->
    <mj-section padding="10px 0">
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
            <th style="text-align: left; padding: 12px">Product</th>
            <th style="text-align: center; padding: 12px">Price</th>
            <th style="text-align: center; padding: 12px">Qty</th>
            <th style="text-align: right; padding: 12px">Total</th>
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
              <strong style="font-size: 16px">Total:</strong>
            </td>
            <td
              style="
                text-align: right;
                padding: 8px 12px;
                border-top: 1px solid #e0e0e0;
              "
            >
              <strong style="font-size: 16px">{{total}}</strong>
            </td>
          </tr>
        </mj-table>
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
      const mjmlTemplate = compile(template)(res);
      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "thinhdev20@gmail.com",
              Name: "Thịnh Nguyễn",
            },
            To: [
              {
                Email: "thinhdev20@gmail.com",
                Name: "Thịnh Nguyễn",
              },
            ],
            Subject: "Your email flight plan!",
            TextPart:
              "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
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
