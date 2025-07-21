export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">🚀 Welcome to CityConnect</h1>
      <p className="text-lg text-gray-700 mb-8">
        A smart civic platform connecting citizens and governments for a cleaner, safer, smarter city.
      </p>
      <a
        href="/report-issue"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
      >
        Report an Issue
      </a>
    </main>
  )
}
