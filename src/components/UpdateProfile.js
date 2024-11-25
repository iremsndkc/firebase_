import { useState } from "react";
import { update, resetPassword } from "../firebase";
import { useSelector } from "react-redux";
import { setUserData } from "../utils";

export default function UpdateProfile() {
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({ displayName, photoURL: avatar });
    setUserData();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6 sm:px-10">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 space-y-12">
        {/* Profil Güncelleme Formu */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Profili Güncelle
          </h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adınız ve Soyadınız
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Adınız ve Soyadınız"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profil Resminizi Güncelleyiniz
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Avatar URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
          >
            Profili Güncelle
          </button>
        </form>

        {/* Parola Güncelleme Formu */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Parola Güncelle
          </h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yeni Parola
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Yeni Parola"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!password}
            className="w-full py-2 px-4 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium disabled:opacity-50"
          >
            Parola Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}
