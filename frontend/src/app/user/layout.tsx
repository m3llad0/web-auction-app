import { Navbar, Footer } from "@/components/layout";

export default function UserLayout({children}: {children: React.ReactNode}) {
    return(
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )   
}