import { useState } from "react";
import Form from "./Form";
import Info from "./Info";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <div className="App">
      {isLogin ? (
        <Info data={userData} setData={setUserData} login={setIsLogin} />
      ) : (
        <Form setData={setUserData} login={setIsLogin} />
      )}
    </div>
  );
}

export default App;
