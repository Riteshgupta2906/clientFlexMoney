import { useState } from "react";
import Form from "./Form";
import Info from "./Info";
import Admin from "./Admin";
import { Route, Routes, BrowserRouter, NavLink } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="">
          <div className="nav-elements">
            <ul>
              <li>
                <NavLink to="/">Register</NavLink>
              </li>
              <li>
                <NavLink to="/admin">Admin</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLogin ? (
              <Info data={userData} setData={setUserData} login={setIsLogin} />
            ) : (
              <Form setData={setUserData} login={setIsLogin} />
            )
          }
        />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
