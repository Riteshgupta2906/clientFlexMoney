import { useEffect, useState } from "react";
import {
  updatePayment,
  monthsBetweenDates,
  updateBatch,
  getBatch,
} from "./ApiFunction";
import "./info.css";
import Swal from "sweetalert2";
import { Modal } from "./Modal";

export default function Info({ data, setData, login }) {
  const {
    participant_id,
    firstname,
    lastname,
    gender,
    age,
    batch_id,
    date_of_joining,
    payment_date,
  } = data;
  const [payDate, setPayDate] = useState(payment_date);
  const [batchState, setBatchState] = useState({});
  const [amount, setAmount] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    if (payDate === null) {
      const referenceDate = new Date();
      const doj = new Date(date_of_joining);
      let temp = monthsBetweenDates(doj, referenceDate);

      setAmount((temp + 1) * 500);
    } else {
      const referenceDate = new Date();
      const doj = new Date(payDate);
      let temp = monthsBetweenDates(doj, referenceDate);
      if (temp !== 0) setPayDate(null);
    }
  }, [date_of_joining, payDate]);
  useEffect(() => {
    async function getData() {
      const res = await getBatch({ participant_id });
      // console.log(res);
      if (res) setBatchState(res.data[0]);
    }
    getData();
  }, []);

  const handlePay = async () => {
    setIsLoading(true);
    const date = new Date().toUTCString();

    const obj = {
      participant_id,
      payment_date: date,
    };
    const data = await updatePayment(obj);
    if (data.msg === "OK") {
      setPayDate(date);
      setAmount(0);
      setIsLoading(false);
      setBatchState({});

      Swal.fire({
        icon: "success",
        title: "Payment Completed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const batchChange = async () => {
    (async () => {
      const { value: b } = await Swal.fire({
        title: "Select Batch",
        input: "select",
        inputOptions: {
          Batch_1: "Batch 1",
          Batch_2: "Batch 2",
          Batch_3: "Batch 3",
          Batch_4: "Batch 4",
        },
        inputPlaceholder: "Select Batch",
        showCancelButton: true,
      });
      if (b) {
        const date = nextMonth(new Date().toUTCString());
        const obj = { participant_id, batch_id: b, date_of_change: date };
        const data = await updateBatch(obj);
        if (data.msg === "OK") {
          const date = nextMonth(new Date().toUTCString());
          const obj = { batch_id: b, date_of_change: date };
          setBatchState(obj);
          Swal.fire({
            icon: "success",
            title: "Batch Updated",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    })();
  };

  const nextMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1, 1);

    return newDate.toLocaleDateString();
  };

  const logOutHandler = () => {
    login(false);
    setData({});
  };
  let imageUrl =
    gender === "Male"
      ? "https://spaces-cdn.clipsafari.com/n2rusxii80nx0dtcw027jvsgfczz"
      : "https://easydrawingguides.com/wp-content/uploads/2022/01/how-to-draw-a-cartoon-woman-featured-image-1200-801x1024.png";
  return (
    <>
      <div className="container">
        {isloading && Modal()}
        <div className="text">User Data</div>
        <div className="card">
          <img src={imageUrl} className="card__image" alt="" />
          <div className="card__text">
            <h2>{`${firstname} ${lastname}`}</h2>
            <p>{batch_id}</p>
            {batchState.date_of_change && (
              <h6 className="batchText">{`*Batch change to ${batchState.batch_id} Applied from ${batchState.date_of_change} `}</h6>
            )}
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

            {amount !== 0 && (
              <li>
                <span className="card__info__stats">{amount}</span>
                <span>Amount</span>
              </li>
            )}

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
            <button
              className="card__action__button card__action--follow"
              onClick={batchChange}
            >
              Change Batch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
