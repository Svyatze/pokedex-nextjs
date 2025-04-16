import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>
                <Link href="/" className="inline-block bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition-colors">
                    Go Home
                </Link>
            </div>
        </div>
    );
}