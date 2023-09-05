import { ToastContainer } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { useApp } from "./hooks/app";
import Setting from "./pages/Setting";
import Logs from "./pages/Logs";

export default function App() {
  const { loggedIn } = useApp();
  return (
    <div id="app">
      {loggedIn.user.loggedIn === undefined ? (
        <div className="h-[100vh] w-full flex items-center justify-center bg-dark040404 relative">
          <PuffLoader className="h-[200px] z-10" color="#C3B5AA" />
        </div>
      ) : loggedIn.user.loggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </Router>
      ) : (
        <Login />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
