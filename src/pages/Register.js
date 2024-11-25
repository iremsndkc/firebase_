import { useState } from "react";
import { register } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    console.log(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 sm:py-12">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Hesap Oluştur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              E-Posta Adresiniz
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourmail@mail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Parola
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!email || !password}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Kayıt Ol
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Zaten bir hesabınız var mı?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Giriş Yap
          </a>
        </p>
      </div>
    </div>
  );
}
