import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <MainNavigation />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
