import { useState } from "react";
import Form from "./Form";
import Info from "./Info";
import Admin from "./Admin";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Info data={userData} setData={setUserData} login={setIsLogin} />
            ) : (
              <Form setData={setUserData} login={setIsLogin} />
            )
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
