import { useState } from "react";
import { updatePayment, monthsBetweenDates } from "./ApiFunction";
import "./info.css";
import Swal from "sweetalert2";
const checkRepayment = (datePay) => {
  if (datePay !== null) {
    const newDate = new Date(Number(datePay));

    const referenceDate = new Date();

    if (monthsBetweenDates(newDate, referenceDate) !== 0) return null;
  }
  return datePay;
};

export default function Info({ data, setData, login }) {
  const {
    participant_id,
    firstname,
    lastname,
    email,
    age,
    batch_id,
    payment_date,
  } = data;
  const [payDate, setPayDate] = useState(checkRepayment(payment_date));

  const handlePay = async () => {
    console.log("clicked");
    const date = Date.now();

    const obj = {
      participant_id,
      payment_date: date,
    };
    const data = await updatePayment(obj);
    if (data.msg === "OK") {
      setPayDate(date);
      Swal.fire({
        icon: "success",
        title: "Payment Completed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const nextMonth = (date) => {
    const newDate = new Date(Number(date));
    //console.log(newDate);
    newDate.setMonth(newDate.getMonth() + 1, 1);

    return newDate.toLocaleDateString();
  };

  const logOutHandler = () => {
    login(false);
    setData({});
  };
  return (
    <>
      <div className="container">
        <div className="text">User Data</div>
        <div className="card">
          <img
            src="https://spaces-cdn.clipsafari.com/n2rusxii80nx0dtcw027jvsgfczz"
            className="card__image"
            alt=""
          />
          <div className="card__text">
            <h2>{`${firstname} ${lastname}`}</h2>
            <p>{batch_id}</p>
          </div>
          <ul className="card__info">
            <li>
              <span className="card__info__stats">{age}</span>
              <span>Age</span>
            </li>
            <li>
              <span className="card__info__stats">
                {payDate ? `${"Done"}` : `${"Not Done"}`}
              </span>
              <span>Payment</span>
            </li>
            {payDate && (
              <li>
                <span className="card__info__stats">{nextMonth(payDate)}</span>
                <span>Next Due</span>
              </li>
            )}
          </ul>
          <div className="card__action">
            {!payDate && (
              <button
                className="card__action__button card__action--follow"
                onClick={handlePay}
              >
                Pay Now
              </button>
            )}
            <button
              className="card__action__button card__action--message"
              onClick={logOutHandler}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
