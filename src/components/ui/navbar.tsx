'use client'
import Image from "next/image"
import GetScrollY from '@/hooks/getScrollY'
function Navbar() {
    const getscrollY = GetScrollY();
    return (
        <header className={`fixed left-0 right-0 top-0 h-[72px] ${getscrollY>150&&"backdrop-blur-xl"} z-20`}>
            <div className="max-w-[1280px] m-auto w-full h-full flex justify-between items-center">
                <div className="ml-4 w-24 md:w-44">
                    <Image src="/logo.svg" alt="Logo" width={200} height={60} className="bg-transparent"/>
                </div>
                <div className="text-2xl md:text-5xl mr-8 font-bold static md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 font-coolguy">기억보관소</div>
            <div className="hidden md:flex font-pretendard text-lg text-gray-500">contact</div>
            </div>
        </header>
    )
}


export default Navbar