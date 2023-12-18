import { useState } from "react";
import AdminData from "./AdminData";
export default function Admin() {
  const value = { email: "", password: "" };
  const [intialValue, setIntialValue] = useState(value);
  const [adminLogin, setAdminLogin] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntialValue({ ...intialValue, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = intialValue;
    if (email === "test@gmail.com" && password === "test@1234")
      setAdminLogin(true);
  };
  return (
    <>
      {!adminLogin && (
        <div className="container">
          <div className="text">Yoga class Form</div>
          <form onSubmit={submitHandler}>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="email"
                  name="email"
                  value={intialValue.email}
                  onChange={handleChange}
                  required
                />
                <div className="underline"></div>
                <label>Email</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="password"
                  name="password"
                  value={intialValue.password}
                  onChange={handleChange}
                  required
                />
                <div className="underline"></div>
                <label>Password</label>
              </div>
            </div>

            <div className="pay">
              <div className="form-row submit-btn">
                <div className="input-data">
                  <div className="inner"></div>
                  <input type="submit" value="Login" />
                </div>
              </div>

              {/* <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="Pay Later" />
              </div>
            </div> */}
            </div>
          </form>
        </div>
      )}
      {adminLogin && <AdminData login={setAdminLogin} />}
    </>
  );
}
