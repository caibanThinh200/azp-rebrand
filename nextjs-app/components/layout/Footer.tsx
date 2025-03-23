import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white pt-20 pb-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Address Section */}
                    <div>
                        <h3 className="font-bold mb-4">AZ PRICE</h3>
                        <p className="text-sm">Tòa Nhà Moonlight Park View (No. TN 21)</p>
                        <p className="text-sm">Số 36-40 đường số 7, Phường An Lạc Á, Quận Bình Tân, Tp.HCM.</p>
                        <p className="text-sm">Điện Thoại: 0952 12.07.87</p>
                        <p className="text-sm">Email: xuprice.vng@gmail.com</p>
                    </div>

                    {/* Customer Support Section */}
                    <div>
                        <h3 className="font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
                        <ul className="text-sm">
                            <li><Link href="#">Dựa Trình Mua Hàng</Link></li>
                            <li><Link href="#">Giao hàng</Link></li>
                            <li><Link href="#">Bảo hành</Link></li>
                            <li><Link href="#">Thanh toán</Link></li>
                            <li><Link href="#">Đối Trả</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h3 className="font-bold mb-4">MẠNG XÃ HỘI</h3>
                        <p className="text-sm mb-4">AZ PRICE Furniture</p>
                        <div className="flex space-x-4">
                            <Link href="#">Follow Page</Link>
                            <Link href="#">Share</Link>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 mt-6 pt-6 text-center">
                    <p className="text-sm">Copyright © 2017 AZP. All rights reserved. Thiết kế website Thịnh Nguyễn</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;