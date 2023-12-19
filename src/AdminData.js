import { useState, useEffect } from "react";
import { getAll } from "./ApiFunction";
import React from "react";
import { Table } from "antd";
import { Modal } from "./Modal";
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
    title: "Date of Joining",
    dataIndex: "doj",
    key: "doj",
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
  //console.log(userData);
  const newData = userData.map((data) => {
    let pay = data.payment_date ? "Done" : "Not Done";
    let newDate = new Date(data.date_of_joining);
    let date = newDate.toLocaleDateString();
    return {
      key: data.participant_id,
      name: `${data.firstname}  ${data.lastname}`,
      email: data.email,
      gender: data.gender,
      age: data.age,
      doj: date,
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
