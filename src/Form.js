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
    batch_id: "Batch 1",
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
      console.log(data1);
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
    const newValues = { participant_id: token(), ...intialValue };

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

          <select
            name="batch_id"
            value={intialValue.batch_id}
            onChange={handleChange}
          >
            <option>Batch 1</option>
            <option>Batch 2</option>
            <option>Batch 3</option>
            <option>Batch 4</option>
          </select>

          <div className="pay">
            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="Enroll Now" />
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
    </>
  );
}
