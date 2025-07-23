export default function SignupPage() {
    return (
      <main className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="p-2 border rounded" />
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
        </form>
      </main>
    );
  }
  