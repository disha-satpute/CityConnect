export default function LoginPage() {
    return (
      <main className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        </form>
      </main>
    );
  }
  