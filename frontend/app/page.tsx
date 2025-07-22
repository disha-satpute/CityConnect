import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">🚀 Welcome to CityConnect</h1>
      <p className="text-lg text-gray-700 mb-8">
        A smart civic platform connecting governments and departments for a smarter city.
      </p>

      <div className="flex flex-col gap-4">
        <Link href="/report-issue">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">
            Report an Issue
          </button>
        </Link>

        <Link href="/admin-login">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition">
            Admin Login
          </button>
        </Link>

        <Link href="/admin-dashboard">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition">
            Admin Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
}
