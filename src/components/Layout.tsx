import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ClientToaster } from '@/components/ui/client-toaster';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="bg-white shadow-sm absolute top-0 left-0 w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                My Drivers
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Kirish
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {/* Header absolute bo'lgani uchun asosiy kontent pastga suriladi */}
        {children}
      </main>
      <ClientToaster />
    </div>
  );
}
