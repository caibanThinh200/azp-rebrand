import Link from "next/link";
import { Input } from "../ui/input";
import { Phone, Search, ShoppingCart } from "lucide-react";
import MegaMenu from "../ui/categories-mega-menu";

const menuItems = [
  { title: "Về chúng tôi", href: "/" },
  { title: "Tin tức", href: "/" },
  { title: "Liên hệ", href: "/" }
]

export default function Header() {
  return (
    <header className="lg:py-10 py-5 flex flex-col gap-5 container">
      <div className="rounded-20 bg-white p-5 flex justify-between items-center">
        <div className="size-[50px] rounded-full bg-grey">
        </div>
        <h1 className="lg:text-heading-1-lg font-bold text-center text-light-brown">Nội thất AZP</h1>
        <div></div>
      </div>
      <div className="flex-col gap-5 hidden lg:flex">
        <div className="flex justify-between items-center">
          <Link href={"tel:0932120787"} className="text-2xl font-bold flex gap-2 items-center text-light-brown">
            <Phone size={32} />
            0932120787
          </Link>
          <div className="flex gap-10 items-center">
            <ul className="flex gap-5 items-center">{menuItems.map((item, idx) => <li key={idx}><Link href={item.href} >{item.title}</Link></li>)}</ul>
            <div><Input icon={<Search />} placeholder="Tìm kiếm sản phẩm" /></div>
            <ShoppingCart />
          </div>
        </div>
        <div className="flex justify-center rounded-20 bg-grey p-5">
          <ul className="flex gap-5 items-center text-white">
            <li><MegaMenu /></li>
            <li><MegaMenu /></li>
            <li><MegaMenu /></li>
            <li><MegaMenu /></li>
          </ul>
          <div></div>
        </div>
      </div>
    </header>
  );
}
