import { useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between border-r-2 bg-gray-300">
      <div className="w-full block">
        <Header />
        <main>
          TODO <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
