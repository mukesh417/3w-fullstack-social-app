import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Feed from "./pages/Feed";

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Routes>
      {/* Protected Home */}
      <Route
        path="/"
        element={isAuth ? <Feed /> : <Navigate to="/login" />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          !isAuth ? (
            <Login setIsAuth={setIsAuth} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={!isAuth ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
