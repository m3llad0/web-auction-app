"use client";
import { Sidebar, Header } from "@/components/layout"
import { BanknotesIcon, ArrowLeftEndOnRectangleIcon, PlusIcon} from "@heroicons/react/24/outline"
import { signOut } from "@/components/utils/signOut"
import { useRouter } from "next/navigation";

export default function Layout({children}: {children: React.ReactNode}) {
    const router = useRouter();

    const handleSignOut = () => {
      signOut(() => router.push('/'));
    };
    
    return(
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="flex-none h-full">
      <Sidebar
        header= {<h1 className=" text-gray-800 text-lg font-bold sm:text-base">Timeless Treasures</h1>}
        items={[
            { name: "My products", icon:  <BanknotesIcon />, link: "/admin" },
            { name: "New product", icon:  <PlusIcon />, link: "/admin/new-auction" },]}
        
        footer = {<div>
            <button onClick={handleSignOut} className="flex items-center p-2 rounded-lg text-gray-800  transition-all duration-300 w-full">
                <span className="flex-shrink-0">
                <ArrowLeftEndOnRectangleIcon className="h-6 w-6"/>
                </span>
                <span className="ml-2 text-gray-800 text-sm text-">Logout</span>
            </button>
        </div>}/>
    </div>
    <div className="flex-1 max-w-full overflow-auto m-0 p-0">
        <Header/>
        {children}
    </div>
  </div>
  )
}