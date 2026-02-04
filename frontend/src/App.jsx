import Login from "./auth/Login";
import Register from "./auth/Register";
import Feed from "./pages/Feed";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="app-container">
      {isAuth ? (
        <Feed />
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
