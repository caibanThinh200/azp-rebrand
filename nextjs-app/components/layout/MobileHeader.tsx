'use client'
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Drawer from 'react-modern-drawer'

interface MobileHeaderProps {
    floating?: boolean
}

const MobileHeader: React.FC<MobileHeaderProps> = ({floating}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    return <div className="block lg:hidden">
        <Button onClick={toggleDrawer} className="p-0" variant={"link"}>
            <Image src={floating ?  "/icons/burger-bar-yellow.svg" : "/icons/burger-bar.svg"} alt="hamburger" width={32} height={32} />
        </Button>
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='right'
            size={"100%"}
            className='p-10'
        >
            <Button variant={"link"} onClick={toggleDrawer}>
                <Image src={"/icons/close.png"} alt="Close" width={20} height={20} />
            </Button>
        </Drawer>
    </div>
}

export default MobileHeader