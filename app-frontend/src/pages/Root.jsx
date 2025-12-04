import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"

export default function RootLayout()
{
    return <div className="min-h-screen bg-neutral-50">
    <MainNavigation/>
    <Outlet/>
    </div>
}