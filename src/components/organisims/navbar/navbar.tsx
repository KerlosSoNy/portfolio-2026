'use client'
import Image from "next/image";
import Link from "next/link";
import NavbarMenu from "./navbarMenu";
import MagneticComponent from "@/components/atoms/Magnitc/Magnitc";

export default function Navbar() {
    return (
        <div className={`w-full px-4 2xs:px-6 md:px-10 xl:px-20 justify-between flex flex-row items-center z-100 fixed  py-4 `}>
            <Link
                href="/"
                className={`no-focus-ring `}
            >
                <MagneticComponent>
                    <Image
                        src="/images/logos/KM.png"
                        alt={"Logo"}
                        width={158}
                        height={40}
                        priority
                        className="w-20 2xs:w-24 h-auto xl:w-30 "
                    />
                </MagneticComponent>
            </Link>
            <div className='flex flex-row items-center'>
                <NavbarMenu />
            </div>
        </div>
    )
}
