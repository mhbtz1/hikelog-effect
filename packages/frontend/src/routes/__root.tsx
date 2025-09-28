import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { JSX } from 'react';

const RootLayout = (): JSX.Element => (
    <div className="flex min-h-screen">
        <aside className="w-30 shrink-0 border-r p-4">
            <nav className="flex flex-col gap-2">
                <Link to="/" className="[&.active]:font-bold"> Home </Link>
                <Link to="/about" className="[&.active]:font-bold"> About </Link>
                <Link to="/loghike" className="[&.active]:font-bold"> Log Hike </Link>
            </nav>
        </aside>
        <main className="flex-1 p-4">
            <Outlet />
        </main>
    </div>
)

export const Route = createRootRoute({
    component: RootLayout,
})
