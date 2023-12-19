import { useState } from "react";
import Swal from "sweetalert2";
import { submitData, findUser } from "./ApiFunction";
import { Modal } from "./Modal";

export default function Form(props) {
  var rand = function () {
    return Math.random().toString(36).substr(2);
  };

  var token = function () {
    return rand() + rand();
  };

  const value = {
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
    batch_id: "",
  };
  const [intialValue, setIntialValue] = useState(value);
  const [isloading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setIntialValue({ ...intialValue, [name]: value });
  };
  const handleData = async (newValues) => {
    setIsLoading(true);
    const data = await findUser({ email: newValues.email });
    //console.log(data);
    if (data === "No user") {
      const data1 = await submitData(newValues);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Enrollment Completed",
        timer: 2000,
        showConfirmButton: false,
      });

      props.login(true);
      props.setData(data1.data);
    } else {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Email Already Exist",
        timer: 2000,
        showConfirmButton: false,
      });
      props.login(true);
      props.setData(data.data[0]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newValues = {
      batch_table_id: token(),
      payment_id: token(),
      participant_id: token(),
      ...intialValue,
    };

    handleData(newValues);
  };
  return (
    <>
      <div className="container">
        {isloading && Modal()}
        <div className="text">Yoga class Form</div>
        <form onSubmit={submitHandler}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                name="firstname"
                value={intialValue.firstname}
                onChange={handleChange}
                required
              />
              <div className="underline"></div>
              <label>First Name</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                name="lastname"
                value={intialValue.lastname}
                onChange={handleChange}
                required
              />
              <div className="underline"></div>
              <label>Last Name</label>
            </div>
          </div>
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
              <label>Email Address</label>
            </div>
            <div className="input-data">
              <input
                type="number"
                name="age"
                min="18"
                max="65"
                value={intialValue.age}
                onChange={handleChange}
                required
              />
              <div className="underline"></div>
              <label>Age</label>
            </div>
          </div>
          <div className="select">
            <select
              name="batch_id"
              value={intialValue.batch_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled selected hidden>
                Batch
              </option>
              <option>Batch1 </option>
              <option>Batch2 </option>
              <option>Batch3 </option>
              <option>Batch4 </option>
            </select>
            <select
              name="gender"
              value={intialValue.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled selected hidden>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="pay">
            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="Enroll Now" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
