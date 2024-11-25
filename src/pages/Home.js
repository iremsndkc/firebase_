import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout as logoutHandle } from "../store/auth";
import {
  logout,
  emailVerification,
  auth,
  addTodo,
  deleteTodo,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { modal } from "../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";

dayjs.extend(relativeTime);
dayjs.locale("tr");

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todos);
  const [parent, enableAnimations] = useAutoAnimate();
  const [todo, setTodo] = useState("");
  const [done, setDone] = useState(true);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      await addTodo({
        todo,
        uid: user.uid,
        done,
      });
      setTodo("");
    } catch (error) {
      console.error("Todo ekleme hatası:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", { replace: true });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6">
            {auth.currentUser.photoURL && (
              <img
                src={auth.currentUser.photoURL}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-lg"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-800">
              Sayın {user.displayName} ({user.email})
            </h1>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <Link
              to="/settings"
              className="px-6 py-2 rounded-md bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600"
            >
              Ayarlar
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
            >
              Çıkış Yap
            </button>
            {!user.emailVerified && (
              <button
                onClick={handleVerification}
                className="px-6 py-2 rounded-md bg-yellow-500 text-white text-sm font-semibold hover:bg-yellow-600"
              >
                E-Posta Onayla
              </button>
            )}
          </div>

          <form
            onSubmit={submitHandle}
            className="bg-gray-50 p-4 rounded-md shadow-inner mb-6"
          >
            <div className="flex items-center gap-x-4 mb-4">
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Todo yaz"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="flex items-center gap-x-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={(e) => setDone(e.target.checked)}
                  className="form-checkbox"
                />
                <span>Tamamlandı</span>
              </label>
              <button
                disabled={!todo}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ekle
              </button>
            </div>
          </form>

          <ul ref={parent} className="space-y-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md"
                >
                  <span
                    className={`flex-1 text-gray-800 ${
                      todo.done ? "line-through" : ""
                    }`}
                  >
                    {todo.todo}
                  </span>
                  {todo?.createdAt?.seconds && (
                    <span className="text-xs text-gray-500">
                      {dayjs.unix(todo.createdAt.seconds).fromNow()}
                    </span>
                  )}
                  <div className="flex gap-x-2">
                    <button
                      onClick={() => modal("edit-todo-modal", todo)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    >
                      Sil
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-yellow-700 font-semibold">
                Hiç Todo Eklemediniz!!
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-3xl font-black text-indigo-500 mb-6">
          React Firebase Authentication Project
        </h1>
        <div className="space-y-4">
          <Link
            to="/register"
            className="block px-6 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600"
          >
            Kayıt Ol
          </Link>
          <Link
            to="/login"
            className="block px-6 py-2 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-600"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
