import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export default function MegaMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Link href={"/"} className="flex gap-2 items-center">Nội thất văn phòng <ChevronDown /></Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={20} align="start" className="min-w-[500px] p-5">
                <div className="flex gap-10">
                    <div className="flex-1">
                        <div>
                            <DropdownMenuLabel className="font-bold text-lg text-brown">Bàn</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </div>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                    </div>
                    <div className="flex-1">
                        <div>
                            <DropdownMenuLabel className="font-bold text-lg text-brown">Bàn</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </div>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex-1">
                        <div>
                            <DropdownMenuLabel className="font-bold text-lg text-brown">Bàn</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </div>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                    </div>
                    <div className="flex-1">
                        <div>
                            <DropdownMenuLabel className="font-bold text-lg text-brown">Bàn</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </div>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">Bàn trà</DropdownMenuItem>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
