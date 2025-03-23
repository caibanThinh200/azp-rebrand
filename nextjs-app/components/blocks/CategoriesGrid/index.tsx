import Image from "next/image"
import Link from "next/link"

const CategoriesGrid: React.FC = () => {
    return <div className="rounded-20 overflow-hidden">
        <div className="grid gap-1 lg:grid-cols-4">
            {Array(8).fill("").map((_, idx) => <Link key={idx} href={"/"} className="relative h-[200px] flex justify-center items-center group overflow-hidden">
                <Image src={"/images/placeholder-1.png"} alt="Grid" width={200} height={200} className="size-full absolute inset-0 brightness-50 object-cover group-hover:scale-125 transition-all duration-500" />
                <p className="text-white text-xl font-bold relative z-10 text-center">Nội thất văn phòng</p>
            </Link>)}
        </div>
    </div>
}

export default CategoriesGrid;