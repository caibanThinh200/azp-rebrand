// "use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Cảm ơn vì đã đặt hàng!</h1>

        <p className="text-gray-600 mb-8">
          Chúng tôi sẽ liên lạc với bạn để tiến hành thanh toán cũng như vận chuyển đơn hàng
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-light-brown">Về trang chủ</Button>
          </Link>

          {/* <Link href="/orders">
            <Button variant="outline">View Orders</Button>
          </Link> */}
        </div>
      </div>
    </div>
  )
}
