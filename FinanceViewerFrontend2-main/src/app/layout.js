import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="uk">
        <body className="bg-zinc-50 antialiased font-sans text-slate-900">
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-8">
                <Link
                    href="/"
                    className="text-blue-950 text-2xl font-bold hover:text-blue-700 transition-colors"
                >
                    Main
                </Link>
                <Link
                    href="/wallet"
                    className="text-blue-950 text-2xl font-bold hover:text-blue-700 transition-colors"
                >
                    Wallet
                </Link>
            </div>

            <div className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Finance Viewer &copy;
            </div>
        </nav>

        <div className="pt-24">
            {children}
        </div>
        </body>
        </html>
    );
}