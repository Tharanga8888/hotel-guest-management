import { Link, NavLink } from 'react-router-dom';
import type { ReactNode } from "react";


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            <header className="border-b bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <Link to="/guests" className="text-xl font-bold">Hotel Guest Management</Link>
                        <nav className="flex items-center gap-4 text-sm">
                            <NavLink to="/guests" className={({isActive}) => isActive ? 'font-semibold' : ''}>Guests</NavLink>
                            <NavLink to="/guests/new" className={({isActive}) => isActive ? 'font-semibold' : ''}>Add Guest</NavLink>
                        </nav>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-6">
                {children}
            </main>
        </div>
    );
}