import { useState, useEffect } from "react";
import { getAll } from "./ApiFunction";
import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Batch",
    dataIndex: "batch",
    key: "batch",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
  },
];

export default function AdminData(props) {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await getAll();
      setUserData(res.data);
    }
    getData();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    props.login(false);
  };

  const newData = userData.map((data) => {
    let pay = data.payment_id === null ? "Not Done" : "Done";
    return {
      key: data.participant_id,
      name: `${data.firstname}  ${data.lastname}`,
      email: data.email,
      gender: data.gender,
      age: data.age,
      batch: data.batch_id,
      payment: pay,
    };
  });

  return (
    <div className="container">
      <div className="text">User Data</div>
      <Table columns={columns} dataSource={newData} size="large" />
      <form onSubmit={submitHandler}>
        <div className="pay">
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input type="submit" value="LogOut" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
